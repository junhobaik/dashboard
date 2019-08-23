import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { USER_DATA } from '../../queries';
import './index.scss';

interface iProps {}
interface iStates {
  googleId: string;
  name: string;
  redirect: boolean;
}

export default class Login extends Component<iProps, iStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      googleId: '',
      name: '',
      redirect: false
    };
  }

  componentWillMount() {
    fetch('/api/account')
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.user) {
          this.setState({
            googleId: json.user.id,
            name: json.user.displayName
          });
        }
      })
      .catch(err => {
        this.setState({
          googleId: '',
          name: ''
        });
      });
  }

  handleNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    this.setState({
      name: newValue
    });
  };

  sendSignUpData = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.state.name })
    }).then(res => {
      if (res.status === 200) {
        // console.log('가입 성공');
        this.setState({
          redirect: true
        });
      }
    });
  };

  render() {
    const { googleId, name, redirect } = this.state;

    if (redirect) return <Redirect to="/" />;

    return (
      <Query query={USER_DATA} variables={{ googleId }}>
        {({ loading, data, error }: any) => {
          let res;

          if (loading)
            res = (
              <div id="Login">
                <p>loading</p>
              </div>
            );

          if (error)
            res = (
              <div id="Login">
                <p>Error</p>
                <span>{error}</span>
              </div>
            );

          if (data.user) return <Redirect to="/" />;

          if (data.user === null) {
            res = (
              <div id="Login">
                <div className="login-inner">
                  <p>Welcome!</p>

                  <form className="sign-up-form" onSubmit={e => this.sendSignUpData(e)}>
                    <div className="name-input form-group">
                      <label htmlFor="signUpNameInput">Name</label>
                      <input
                        type="text"
                        id="signUpNameInput"
                        className="form-control"
                        value={name}
                        onChange={e => this.handleNameValue(e)}
                      />
                    </div>

                    <input id="signUpSubmit" className="btn btn-primary" type="submit" value="Sign Up" />
                  </form>
                </div>
              </div>
            );
          } else {
            res = <div />;
          }

          return res;
        }}
      </Query>
    );
  }
}
