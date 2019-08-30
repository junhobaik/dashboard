import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './apolloClient';
import './App.scss';

import Home from './components/Home';
import User from './components/User';
import Header from './components/Header';
import Login from './components/Login';
import Intro from './components/Intro';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/intro" component={Intro} />
        <Route path="/login" component={Login} />
        <Route path="/user" component={User} />
      </Router>
    </ApolloProvider>
  );
};

export default App;
