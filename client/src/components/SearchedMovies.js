import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Button,
  Form,
  Card,
  Col,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_MOVIE } from "../utils/mutations";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import SavedMovies from "./SavedMovies";

const SearchedMovies = () => {
  // create states for holding returned fetch results, search input field and saved movies
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

  // save movieid to local storage for persistence
  useEffect(() => {
    saveMovieIds(savedMovieIds);
  }, [savedMovieIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      alert("You must enter a search term!");
      return false;
    }
    const key = process.env.REACT_APP_API_KEY;

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&apikey=${key}`
      );
      if (!response.ok) {
        throw new Error("Oops, something went wrong");
      }

      const items = await response.json();
      
      if (!items || !items['Search']) {
        alert("No results for that search term");
        setSearchInput('');
        return false;
      }

      const movies = items.Search;
      const movieData = movies.map((movie) => ({
        movieID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
      }));
      setSearchedMovies(movieData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieID) => {
    if (savedMovieIds.length >= 5) {
      alert("You can only have 5 nominees!");
      return;
    }

    const movieToSave = searchedMovies.find(
      (movie) => movie.movieID === movieID
    );

    try {
      await saveMovie({
        variables: {
          title: movieToSave.title,
          year: movieToSave.year,
          movieID: movieToSave.movieID,
        },
      });
    } catch (err) {
      console.error(err);
    }
    setSavedMovieIds([...savedMovieIds, movieToSave.movieID]);
  };

  // const newLocal = searchedMovies.length || savedMovieIds.length;
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>The Shoppies</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      {(!searchedMovies.length ) ? null :
        <section className="shoppie-container">
          <Container className="result-container">
          <h2>Results for '{searchInput}'</h2>
            <Card>
              <ListGroup variant="flush">
                {searchedMovies.map((movie) => {
                  return (
                    <ListGroupItem key={movie.movieID}>
                      {`Title: ${movie.title} (${movie.year})`}
                      <Button
                        disabled={savedMovieIds?.some(
                          (savedID) => savedID === movie.movieID
                        )}
                        className="btn-block, btn-info"
                        onClick={() => {
                          handleSaveMovie(movie.movieID);
                        }}
                        variant="primary"
                      >
                        Nominate
                      </Button>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
          </Container>
          
          {/* pass setter function as prop to child so state can be updated from child */}
          <SavedMovies
            newMovieIds={savedMovieIds}
            setSavedMovieIds={setSavedMovieIds}
          />
        </section>
      }
      {/* need better error handling */}
      {error && <h2>Oops!</h2>}
    </>
  );
};

export default SearchedMovies;
