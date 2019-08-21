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
  _isMounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      googleId: '',
      name: '',
      redirect: false
    };
  }

  componentDidMount() {
    this._isMounted = true;

    fetch('/api/account')
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.user && this._isMounted) {
          this.setState({
            googleId: json.user.id,
            name: json.user.displayName
          });
        }
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({
            googleId: '',
            name: '',
            redirect: true
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      //가입 성공
      if (res.status === 200) {
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

          if (loading) res = <span>loading</span>;
          if (error) res = <span>error</span>;
          if (data.user) {
            res = <Redirect to="/" />;
          } else {
            res = (
              <div id="Login">
                <div className="home-inner">
                  <form onSubmit={e => this.sendSignUpData(e)}>
                    name: <input type="text" value={name} onChange={e => this.handleNameValue(e)} />
                    <input type="submit" value="Sign Up" />
                  </form>
                </div>
              </div>
            );
          }

          return res;
        }}
      </Query>
    );
  }
}
