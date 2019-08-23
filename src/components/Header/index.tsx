import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
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
          let loginStatus: any;
          let userName: string | undefined;

          if (loading) loginStatus = <span>loding...</span>;
          if (error) loginStatus = <span>error</span>;

          if (data.user) {
            const { name } = data.user;
            userName = name;
            loginStatus = <a href="/auth/logout">logout</a>;
            if (history.location.pathname === '/') {
              return <Redirect to="/user" />;
            }
          } else {
            loginStatus = <a href="/auth/google">Sign in / Sign up</a>;
          }

          return (
            <header id="Header">
              <div className="header-inner">
                <div className="title">
                  <Link to={userName ? '/user' : '/'}>
                    <h1>{userName ? `${userName}'s Dashboard` : `Dashboard`}</h1>
                  </Link>
                </div>
                <div className="user-info">{loginStatus}</div>
              </div>
            </header>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Header);
