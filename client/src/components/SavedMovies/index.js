import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { REMOVE_MOVIE } from "../../utils/mutations";
import { QUERY_MOVIES } from "../../utils/queries";
import { getSavedMovieIds, removeMovieId } from "../../utils/localStorage";

const SavedMovies = (props) => {
  // get list of saved nominees if any
  const { loading, data, refetch } = useQuery(QUERY_MOVIES);

  // if a movie is removed from list of nominees (execute query again) re-render page
  const [removeMovie] = useMutation(REMOVE_MOVIE);

  // if a movie is added to list of nominees re-render page
  let newMovieIds = props.newMovieIds;
  useEffect(() => {
    if (newMovieIds && !loading) {
      refetch();
    }
  }, [newMovieIds, loading, refetch]);

  const movieData = data?.movies || {};

  const handleRemoveMovie =  async(_id, movieID) => {
    try {
       await removeMovie({
        variables: { _id },
      });
      // also remove from localStorage
      removeMovieId(movieID);
      return props.setSavedMovieIds(getSavedMovieIds());
    } catch (err) {
      console.error("Problem: " + err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  };

  return (
    <>
      {!movieData.length ? null :
        <section className="nominee-container column">
          <h2>
            {movieData.length
              ? `the ${movieData.length === 1 ? 'Nominee is:' : 'Nominees are:'}`
              : `Nominees Please!`}
          </h2>
            <section className='list-group'>
              {movieData.map((movie) => {
                return (
                  <section className='list-group-item' key={movie.movieID}>
                  <img className='group-img' src={movie.image} alt='movie poster' />
                      <div className='info'>
                        <h5 className='title'>{`Title: ${movie.title}`}</h5>
                        <p className='description'>{`Released: ${movie.year}`}</p>
                      </div>
                    <button
                      className="btn remove-btn"
                      onClick={() => {
                        (handleRemoveMovie(movie._id, movie.movieID));
                      }}
                      variant="outline-danger"
                      size='sm'
                    >
                      Remove
                    </button>
                 </section>
                );
              })}
              <></>
            </section>
        </section>
      }
    </>
  );
};

export default SavedMovies;
