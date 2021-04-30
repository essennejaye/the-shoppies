import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  Button,
  Form,
  Card,
  Col,
  ListGroupItem,
  ListGroup,
  Image
} from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_MOVIE } from "../utils/mutations";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import SavedMovies from "./SavedMovies";
import AlertModal from "./AlertModal";

const SearchedMovies = () => {
  //  create states for holding returned fetch results, search input field and saved movies
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  const [saveMovie] = useMutation(SAVE_MOVIE);
  const [show, setShow] = useState('');
  const [message, setMessage] = useState('')

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      setShow('show');
      setMessage('Please enter a search term!');
      return false;
    }

    const key = process.env.REACT_APP_API_KEY;
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&apikey=${key}`
      );
      if (!response.ok) {
        setShow('show');
        setMessage(`Internal server error.\n Please try again!`);
      }

      const items = await response.json();
      if (!items || !items['Search']) {
        setShow('show');
        setMessage(`We're sorry.\nThere were no selections found with that search term!\nPlease try again.`)
        setSearchInput('');
        return false;
      }

      const movies = items.Search;
      const movieData = movies.map((movie) => ({
        movieID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      }));
      setSearchedMovies(movieData);
    } catch (err) {
      console.error("Problem: " + err.response);
    }
  };

  const handleSaveMovie = async (movieID) => {
    if (savedMovieIds.length >= 5) {
      setShow('show');
      setMessage("You can only nominate 5 selections!");
      return false;
    }

    const movieToSave = searchedMovies.find(
      (movie) => movie.movieID === movieID
    );

    try {
      await saveMovie({
        variables: {
          title: movieToSave.title,
          year: movieToSave.year,
          image: movieToSave.image,
          movieID: movieToSave.movieID,
        },
      });
      saveMovieIds([...savedMovieIds, movieToSave.movieID]);

    } catch (err) {
      console.error("Problem: " + err.response);
    }
    setSavedMovieIds([...savedMovieIds, movieToSave.movieID]);
  };
  const clearSearch = () => {
    setSearchInput('');
    setSearchedMovies([]);
  }

  return (
    <>
      <Jumbotron fluid className="bg-image">
        <div className='transbox'>
          <h1 className='title'>The Shoppies</h1>
        </div>
      </Jumbotron>
      <Container className='form-submit'>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row>
            <Col xs={12} md={8}>
              <Form.Label>Search</Form.Label>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Search for a movie or tv series by name"
              />
            </Col>
            <Col xs={12} md={4} className='form-btn'>
              <Button 
                type="submit" 
                variant="success" 
                size="lg"
              >
                Submit Search
              </Button>
              <Button 
                type="button" 
                variant="info" 
                size="lg" 
                onClick={() => clearSearch()}
              >
                Clear Search
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>

      {(show) ? <AlertModal onClose={() => setShow('hide')} show={show} setShow={setShow}>
        <p>{message}</p>
      </AlertModal> : null
      }
      <section className="shoppie-container row">
        {(!searchedMovies.length) ? null :

          <Container className="result-container column">
            <h2>Results for: {searchInput}</h2>
            <Card>
              <ListGroup variant="flush">
                {searchedMovies.map((movie) => {
                  return (
                    <ListGroupItem key={movie.movieID}>
                      <Image src={movie.image} />
                      <div className='info'>
                        <h5 className='title'>{`Title: ${movie.title}`}</h5>
                        <p className='description'>{`Released: ${movie.year}`}</p>
                      </div>
                      <Button
                        disabled={savedMovieIds?.some(
                          (savedID) => savedID === movie.movieID
                        )}
                        className="mb-2 result-btn"
                        onClick={() => {
                          handleSaveMovie(movie.movieID);
                        }}
                        variant="outline-success"
                        size='sm'
                      >
                        Nominate
                      </Button>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
          </Container>
        }
        {(!savedMovieIds.length) ? null :
          <SavedMovies
            newMovieIds={savedMovieIds}
            setSavedMovieIds={setSavedMovieIds}
          />
        }
      </section>
    </>
  );
};

export default SearchedMovies;
