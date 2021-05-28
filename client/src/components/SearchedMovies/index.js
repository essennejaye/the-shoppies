import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_MOVIE } from "../../utils/mutations";
import { saveMovieIds, getSavedMovieIds } from "../../utils/localStorage";
import { movieFetch } from '../../utils/movieFetch/index';
import SavedMovies from "../SavedMovies";
import AlertModal from "../AlertModal";

const SearchedMovies = () => {
  //  create states for holding returned fetch results, search input field and saved movies
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  const [saveMovie] = useMutation(SAVE_MOVIE);
  const [show, setShow] = useState('');
  const [message, setMessage] = useState('');

  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      let errorMessage = ('Please enter a search term!');
      callAlertModal(errorMessage);
      return;
    }
    const results = await movieFetch(searchInput);
    try {
      const movies = results;
      const movieData = movies.map((movie) => ({
        movieID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      }));
      setSearchedMovies(movieData);
    } catch (err) {
      setSearchInput('');
      let errorMessage = (results);
      callAlertModal(errorMessage);
    }
  };

  const handleSaveMovie = async (movieID) => {
    if (savedMovieIds.length >= 5) {
      let errorMessage = "You can only nominate 5 selections!";
      callAlertModal(errorMessage);
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
          image: movieToSave.image,
          movieID: movieToSave.movieID,
        },
      });
      saveMovieIds([...savedMovieIds, movieToSave.movieID]);
    } catch (err) {
      console.error("Problem: " + err.response);
      let errorMessage = "Your movie was not saved!";
      callAlertModal(errorMessage);
    }
    setSavedMovieIds([...savedMovieIds, movieToSave.movieID]);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchedMovies([]);
  }

  const callAlertModal = (errorMessage) => {
    setShow('show');
    setMessage(errorMessage);
  }

  return (
    <>
      <section className="bg-image">
        <h1 className='title'>The Shoppies</h1>
        <img className='hero-img' src='../images1/movies.png' alt='movie themed clipart' />
      </section>
      <section className='form-container'>
        <form className='form-submit' onSubmit={handleFormSubmit}>
          <div className='form-label'>
            <label htmlFor='searchInput'>
              <h6>Search</h6>
            </label>
          </div>
          <div className='input-form'>
            <input
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              // size="lg"
              placeholder="Search for a movie or tv show by name"
              autoFocus={true}
              ref={inputEl}
            />
          </div>
          <div className='form-btns'>
            <button
              className='form-searchBtn btn'
              type="submit"
              variant="success"
              size="lg"
            >
              Submit Search
              </button>
            <button
              className='form-clearBtn btn'
              type="button"
              variant="info"
              size="lg"
              onClick={() => clearSearch()}
            >
              Clear Search
              </button>
          </div>
        </form>
      </section>

      {(show) ? <AlertModal onClose={() => setShow('hide')} show={show} setShow={setShow}>
        <p>{message}</p>
      </AlertModal> : null
      }
      {(searchedMovies.length || savedMovieIds.length) ?
        <div className='zoom-text'>
          <p >
            Roll over image to enlarge.
              </p>
        </div>
        : null
      }
      <section className="shoppie-container row">
        {(!searchedMovies.length) ? null :
          <section className="result-container column">
            <h2>Results for: {searchInput}</h2>
            <section className='list-group'>
              {searchedMovies.map((movie) => {
                return (
                  <div className='list-group-item' key={movie.movieID}>
                    <img className='group-img' src={movie.image} alt='movie poster' />
                    <div className='info'>
                      <h5 className='title'>{`Title: ${movie.title}`}</h5>
                      <p className='description'>{`Released: ${movie.year}`}</p>
                    </div>
                    <button
                      disabled={savedMovieIds?.some(
                        (savedID) => savedID === movie.movieID
                      )}
                      className="result-btn btn"
                      onClick={() => {
                        handleSaveMovie(movie.movieID);
                      }}
                      variant="outline-success"
                      size='sm'
                    >
                      Nominate
                      </button>
                  </div>
                );
              })}
            </section>
          </section>
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
