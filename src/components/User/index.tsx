import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { USER_DATA } from '../../queries';

interface iProps {}
interface iStates {
  googleId: String;
}

export default class User extends Component<iProps, iStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      googleId: ''
    };
  }

  componentWillMount() {
    fetch('/api/account')
      .then(res => res.json())
      .then(json => {
        if (json.user) {
          this.setState({
            googleId: json.user.id
          });
        }
      });
  }

  render() {
    const { googleId } = this.state;

    return (
      <Query query={USER_DATA} variables={{ googleId }}>
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
