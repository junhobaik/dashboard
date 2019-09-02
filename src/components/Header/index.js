import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { HEADER_QUERY } from '../../queries';
import './index.scss';

const Header = () => {
  return (
    <header id="Header">
      <div className="header-inner">
        <Query query={HEADER_QUERY}>
          {({ loading, data, error }) => {
            console.log('Header <Qeury />', loading, data, error);

            let loginStatus = <a href="/auth/google">Login with Google</a>;

            if (loading) loginStatus = <span>Loding...</span>;
            if (error) loginStatus = <span>Error..!</span>;

            if (data && data.user) {
              console.log(data.user);
              loginStatus = (
                <a href="/auth/logout">
                  <img src={data.user.picture} alt="google user profile" />
                </a>
              );
            }

            return (
              <React.Fragment>
                <div className="title">
                  <Link to={data.user ? '/board' : '/'}>
                    <h1>DashBoard</h1>
                  </Link>
                </div>
                <div className="user-info">{loginStatus}</div>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    </header>
  );
};

export default Header;
