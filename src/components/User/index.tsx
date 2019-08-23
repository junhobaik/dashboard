import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { USER_DATA } from '../../queries';

import './index.scss';

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

  componentDidMount() {
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

          if (data.user === null) return <Redirect to={'/'} />;

          return (
            <div id="User">
              <div className="user-inner">
                <div className="left">
                  <div className="header" />
                  <div className="content" />
                </div>
                <div className="right">
                  <div className="header" />
                  <div className="content" />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
