import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { ADMIN } from '../../queries';
import './index.scss';

export default class Admin extends Component {
  render() {
    return (
      <Query query={ADMIN}>
        {({ loading, data, error }: any) => {
          if (loading) return <span>loading</span>;
          if (error) return <span>error</span>;

          const users = data.users.map((v: any, i: Number) => {
            const { name, _id, feeds } = v;

            const feedList = feeds.map((v: any) => {
              return <li key={`feed-${v._id}`}>
                <p>_id: {v._id}</p>
                <p>title: {v.title}</p>
              </li>;
            });

            return (
              <li key={`${name}-${_id}`}>
                <p>_id: {_id}</p>
                <p>name: {name}</p>
                <ul>{feedList}</ul>
              </li>
            );
          });

          return (
            <div id="Admin">
              <ul>{users}</ul>
            </div>
          );
        }}
      </Query>
    );
  }
}
