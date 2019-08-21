import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { USER_DATA } from '../../queries';
import './index.scss';

interface iProps {}
interface iStates {
  googleId: String;
}

export default class Header extends Component<iProps, iStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      googleId: ''
    };
  }

  componentWillMount() {
    fetch('/api/account')
      .then(res => res.json())
      .then(json => {
        if (json.user) {
          this.setState({
            googleId: json.user.id
          });
        }
      });
  }

  render() {
    const { googleId } = this.state;

    return (
      <Query query={USER_DATA} variables={{ googleId }}>
        {({ loading, data, error }: any) => {
          let userReder: any;

          if (loading) userReder = <span>loding...</span>;

          if (error) userReder = <span>error</span>;

          if (data.user) {
            const { name } = data.user;
            userReder = <a href="/auth/logout">{name}</a>;
          } else {
            userReder = <a href="/auth/google">login</a>;
          }

          return (
            <header id="Header">
              <div className="header-inner">
                <div className="title">
                  <h1>Dashboard</h1>
                </div>
                <div className="user-info">{userReder}</div>
              </div>
            </header>
          );
        }}
      </Query>
    );
  }
}
