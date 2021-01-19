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
  const { loading, data, refetch } = useQuery(QUERY_MOVIES);

  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    refetchQueries: [{ query: QUERY_MOVIES }],
  });

  let newMovieIds = props.newMovieIds;
  useEffect(() => {
    if (!loading) {
      refetch();
    }
  }, [newMovieIds, loading, refetch]);

  const movieData = data?.movies || {};

  const handleRemoveMovie = async (_id, movieID) => {
    try {
      await removeMovie({
        variables: { _id },
      });
      // also remove from localStorage
      removeMovieId(movieID);
      return;
    } catch (err) {
      console.error(err);
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
          ? `the '${movieData.length}' ${movieData.length === 1 ? ' Nominee is:' : 'Nominees are:'}`
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
                  onClick={async () => {
                    await (handleRemoveMovie(movie._id, movie.movieID));
                    // pass saved movies back to parent to re-enable buttons
                    props.setSavedMovieIds(getSavedMovieIds());
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
