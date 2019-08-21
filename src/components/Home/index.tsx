import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export interface iProps {}
export interface iStates {
  login: boolean;
}

export default class Home extends Component<iProps, iStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false
    };
  }

  componentDidMount() {
    fetch('/api/account')
      .then(res => res.json())
      .then(json => {
        if (json.user) {
          this.setState({
            login: true
          });
        }
      });
  }

  render() {
    const { login } = this.state;

    if (login) return <Redirect to={'/user'} />;

    return <div id="Home">Home</div>;
  }
}
