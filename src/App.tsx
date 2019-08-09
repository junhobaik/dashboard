import React from 'react';
import './App.scss';

export interface AppProps {}
export interface AppStates {
  foo: boolean;
}

class App extends React.Component<AppProps, AppStates> {
  constructor(props: object) {
    super(props);
    this.state = {
      foo: true
    };
  }

  render() {
    return <div id="App"/>;
  }
}

export default App;
