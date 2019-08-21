import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps, Redirect } from 'react-router';

import { USER_DATA } from '../../queries';
import './index.scss';

interface iProps {
  history: any;
}
interface iStates {
  googleId: string;
}

class Header extends Component<RouteComponentProps<iProps>, iStates> {
  _isMounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      googleId: ''
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
            googleId: json.user.id
          });
        }
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({
            googleId: ''
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { history } = this.props;
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
            if (history.location.pathname === '/') {
              return <Redirect to="/user" />;
            }
          } else {
            userReder = <a href="/auth/google">Sign in / Sign up</a>;
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

export default withRouter(Header);
