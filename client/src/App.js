import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {ApolloProvider} from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost';

import SearchedMovies from './components/SearchedMovies';
import SavedMovies from './components/SavedMovies';
const client = new ApolloClient({
  uri: 'graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
      <Switch>
        <Route exact path='/' component={SearchedMovies} />
        <Route exact path='/' component={SavedMovies} />
        <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
