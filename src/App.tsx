import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './apolloClient';
import './App.scss';

import Home from './components/Home';

export interface AppProps {}
export interface AppStates {}

class App extends React.Component<AppProps, AppStates> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route exact={true} path={`/`} component={Home} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
