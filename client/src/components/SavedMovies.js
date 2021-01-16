import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { REMOVE_MOVIE } from "../utils/mutations";
import { QUERY_MOVIES } from "../utils/queries";
import { removeMovieId } from "../utils/localStorage";

// function arrayEquals(a, b) {
//     let areArrays = Array.isArray(a) && Array.isArray(b);
//     let sameLength = a.length === b.length;
//     let ev = a.every((val, index) => val === b[index]);
//     return areArrays && sameLength && ev;
//   }

const SavedMovies = (newMovieIdsObj) => {
  const { loading, data, refetch } = useQuery(QUERY_MOVIES);
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  //   const [movieIds, setMovieIds] = useState([]);

  let newMovieIds = newMovieIdsObj["newMovieIds"];
  useEffect(() => {
    if (!loading) {
      refetch();
    }
    // if (!arrayEquals(movieIds, newMovieIds)) {
    //     setMovieIds(newMovieIds);
    // }
  }, [newMovieIds, loading, refetch]);

  const movieData = data?.movies || {};

  const handleRemoveMovie = async (_id, movieID) => {
    try {
      await removeMovie({
        variables: { _id },
      });
      // also remove from localStorage
      removeMovieId(movieID);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container className="nominee-container">
      <h2>
        {movieData.length
          ? `the '${movieData.length}' Nominees are:`
          : `Nominees Please!`}
      </h2>
      <Card>
        <ListGroup variant="flush">
          {movieData.map((movie) => {
            return (
              <ListGroupItem key={movie.movieID}>
                {`Title: ${movie.title} (${movie.year})`}
                <Button
                  className="btn-block, btn-info"
                  onClick={() => handleRemoveMovie(movie._id, movie.movieID)}
                  variant="success"
                >
                  Remove
                </Button>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default SavedMovies;
