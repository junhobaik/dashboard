import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './apolloClient';
import './App.scss';

import Home from './components/Home';
import User from './components/User';
import Admin from './components/Admin';

export interface AppProps {}
export interface AppStates {}

class App extends React.Component<AppProps, AppStates> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
            <Route exact={true} path={`/`} component={Home} />
            <Route path={`/user/:userId`} component={User} />
            <Route path={`/admin`} component={Admin} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
