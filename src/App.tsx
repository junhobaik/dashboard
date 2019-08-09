import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './apolloClient';
import './App.scss';

export interface AppProps {}
export interface AppStates {}

class App extends React.Component<AppProps, AppStates> {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="App">App</div>
      </ApolloProvider>
    );
  }
}

export default App;
