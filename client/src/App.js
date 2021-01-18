import React from 'react';

import {ApolloProvider} from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost';

import SearchedMovies from './components/SearchedMovies';
const client = new ApolloClient({
  uri: 'graphql',
});

function App() {

  return (
    <ApolloProvider client={client}>

    <SearchedMovies />
      
    </ApolloProvider>
  );
}

export default App;
