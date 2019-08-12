import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { ADMIN } from '../../queries';

export default class Admin extends Component {
  render() {
    return (
      <Query query={ADMIN}>
        {({ loading, data, error }: any) => {
          if (loading) return <span>loading</span>;
          if (error) return <span>error</span>;

          console.log(data);
          return (
            <div id="Admin">
              {JSON.stringify(data)}
            </div>
          );
        }}
      </Query>
    );
  }
}
