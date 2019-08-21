import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './apolloClient';
import './App.scss';

import Home from './components/Home';
import User from './components/User';
import Admin from './components/Admin';
import Header from './components/Header';

export interface AppProps {}
export interface AppStates {}

class App extends React.Component<AppProps, AppStates> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <Router>
          <Route exact={true} path={`/`} component={Home} />
          <Route path={`/user`} component={User} />
          <Route path={`/admin`} component={Admin} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
