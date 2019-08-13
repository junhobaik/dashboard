import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { USER_DATA } from '../../queries';

interface iProps {
  match: any;
}
interface iStates {}

export default class User extends Component<iProps, iStates> {
  render() {
    const { match } = this.props;
    const { userId } = match.params;

    return (
      <Query query={USER_DATA} variables={{ userId }}>
        {({ loading, data, error }: any) => {
          if (loading) return <span>loading</span>;
          if (error) return <span>error</span>;

          const { name } = data.user;
          return (
            <div id="User">
              <div className="home-inner">{`${name}님 환영합니다.`}</div>
            </div>
          );
        }}
      </Query>
    );
  }
}
