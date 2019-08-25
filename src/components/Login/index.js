/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { USER_DATA } from '../../queries';
import './index.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleId: '',
      name: '',
      redirect: false,
      signUpStatus: ''
    };
  }

  componentDidMount() {
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
      .catch(() => {
        this.setState({
          googleId: '',
          name: '',
          redirect: true
        });
      });
  }

  handleNameValue = e => {
    const newValue = e.currentTarget.value;

    this.setState({
      name: newValue
    });
  };

  sendSignUpData = e => {
    const { name } = this.state;
    e.preventDefault();

    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => {
        this.setState({
          signUpStatus: 'info'
        });
        setTimeout(() => {
          if (res.status === 201) {
            this.setState({
              signUpStatus: 'success'
            });
          }
          if (res.status === 202) {
            this.setState({
              signUpStatus: 'warning'
            });
          }
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          this.setState({
            signUpStatus: 'danger'
          });
        }, 3000);
      });
  };

  render() {
    const { googleId, name, redirect, signUpStatus } = this.state;

    if (redirect) return <Redirect to="/" />;

    return (
      <Query query={USER_DATA} variables={{ googleId }}>
        {({ loading, data, error }) => {
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

          let statusMsg;
          switch (signUpStatus) {
            case 'success':
              statusMsg = (
                <div className="alert alert-success" role="alert">
                  가입이 완료되었습니다, 다시 로그인해주세요.
                </div>
              );
              break;
            case 'warning':
              statusMsg = (
                <div className="alert alert-warning" role="alert">
                  알 수 없는 오류가 발생했습니다. 다시 시도해주세요.
                </div>
              );
              break;
            case 'info':
              statusMsg = (
                <div className="alert alert-info" role="alert">
                  잠시만 기다려주세요...
                </div>
              );
              break;
            case 'danger':
              statusMsg = (
                <div className="alert alert-danger" role="alert">
                  죄송합니다, 서버에 오류가 있습니다. 잠시 후 다시 시도해주세요.
                </div>
              );
              break;

            default:
              break;
          }

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

                    <input
                      id="signUpSubmit"
                      className="btn btn-primary"
                      type="submit"
                      value="Sign Up"
                    />
                  </form>

                  <div className="status-msg">{statusMsg}</div>
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
