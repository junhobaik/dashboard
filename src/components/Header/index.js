import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { USER_DATA } from '../../queries';
import './index.scss';

const Header = () => {
  return (
    <header id="Header">
      <div className="header-inner">
        <div className="title">
          <Link to="/">
            <h1>DashBoard</h1>
          </Link>
        </div>
        <div className="user-info">
          <Query query={USER_DATA}>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
