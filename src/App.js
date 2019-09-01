import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './apolloClient';
import './App.scss';

import Home from './components/Home';
import User from './components/User';
import Header from './components/Header';
import Board from './components/Board';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/board" component={Board} />
      </Router>
    </ApolloProvider>
  );
};

export default App;
