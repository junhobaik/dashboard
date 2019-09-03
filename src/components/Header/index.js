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
            // console.log('Header <Qeury />', data);

            let loginStatus = <a href="/auth/google">Login with Google</a>;
            let titleLink = '/';

            if (loading) loginStatus = <span>Loding...</span>;
            if (error) loginStatus = <span>Error..!</span>;

            if (data && data.user) {
              loginStatus = (
                <a href="/auth/logout">
                  <img src={data.user.picture} alt="google user profile" />
                </a>
              );
              titleLink = '/board';
            }

            return (
              <React.Fragment>
                <div className="title">
                  <Link to={titleLink}>
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
