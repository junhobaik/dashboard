import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

import { USER_DATA } from '../../queries';

import './index.scss';

export default class User extends Component {
  constructor(props) {
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
        {({ loading, data, error }) => {
          if (loading) return <span>loading</span>;
          if (error) return <span>error</span>;

          if (data.user === null) return <Redirect to={'/'} />;

          return (
            <div id="User">
              <div className="user-inner">
                <div className="left">
                  <div className="header">
                    <div className="add-feed">
                      <Fa icon={faPlus} />
                    </div>
                    <div className="setting">
                      <Fa icon={faCog} />
                    </div>
                  </div>
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
