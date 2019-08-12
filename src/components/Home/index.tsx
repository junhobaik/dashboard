import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { HOME_PAGE } from '../../queries';

export default class Home extends Component {
  render() {
    return (
      <Query query={HOME_PAGE}>
        {({ loading, data, error }: any) => {
          if (loading) return <span>loading</span>;
          if (error) return <span>error</span>;

          const { name } = data.user;
          return (
            <div id="Home">
              <div className="home-inner">{`${name}님 환영합니다.`}</div>
            </div>
          );
        }}
      </Query>
    );
  }
}
