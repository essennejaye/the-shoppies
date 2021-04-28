import React, { useEffect } from "react";
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
import { getSavedMovieIds, removeMovieId } from "../utils/localStorage";

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
        <Container className="nominee-container">
          <h2>
            {movieData.length
              ? `the ${movieData.length === 1 ? 'Nominee is:' : 'Nominees are:'}`
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
                      onClick={() => {
                        (handleRemoveMovie(movie._id, movie.movieID));
                      }}
                      variant="outline-danger"
                    >
                      Remove
                    </Button>
                 </ListGroupItem>
                );
              })}
              <></>
            </ListGroup>
          </Card>
        </Container>
      }
    </>
  );
};

export default SavedMovies;
