import gql from 'graphql-tag';

export const SAVE_MOVIE = gql `
mutation saveMovie($title: String!, $year: String!, $image: String, $movieID: String!) {
    saveMovie(title: $title, year: $year, image: $image, movieID: $movieID) {
        title
        year
        image
        movieID
    }
}
`;

export const REMOVE_MOVIE = gql `
mutation removeMovie($_id: ID!) {
    removeMovie(_id: $_id) {
        _id
        title
        year
        image
        movieID
    }
}
`;
