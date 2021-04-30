import gql from 'graphql-tag';

export const QUERY_MOVIES = gql`
{
    movies {
        _id
        title
        year
        image
        movieID
    }
}
`;