import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import './index.scss';
import { USER_DATA } from '../../queries';

const Home = () => {
  return (
    <div id="Home">
      <Query query={USER_DATA}>
        {({ loading, data, error }) => {
          console.log('Home <Qeury />', loading, data, error);

          if (loading) return <span>Loding...</span>;
          if (error) return <span>Error..!</span>;

          if (data && data.user) {
            return <span>Home</span>;
          }
          
          return <Redirect to="/intro" />;
        }}
      </Query>
    </div>
  );
};

export default Home;
