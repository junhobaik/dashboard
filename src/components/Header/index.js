import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';

import { USER_DATA } from '../../queries';
import './index.scss';

class Header extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      googleId: null
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
      .catch(() => {
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

  getAccountId = async () => {
    const response = await fetch('/api/account');
    const json = await response.json();
    return json.user.id.toString();
  };

  render() {
    console.log('Header render()');
    const { googleId } = this.state;

    return (
      <header id="Header">
        <div className="header-inner">
          <div className="title">
            <Link to={googleId ? '/user' : '/'}>
              <h1>DashBoard</h1>
            </Link>
          </div>
          <div className="user-info">
            {googleId ? (
              <Query query={USER_DATA} variables={{ googleId }}>
                {({ loading, data, error }) => {
                  console.log('Header <Qeury />', loading, data, error);

                  if (loading) return <span>Loding...</span>;
                  if (error) return <span>Error..!</span>;

                  if (data && data.user) {
                    return <a href="/auth/logout">Logout</a>;
                  }

                  return <a href="/auth/google">Login by Google</a>;
                }}
              </Query>
            ) : (
              <a href="/auth/google">Login by Google</a>
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
