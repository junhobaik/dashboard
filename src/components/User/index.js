import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

import './index.scss';
import { USER_DATA } from '../../queries';
import AddFeedModal from './AddFeedModal';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleId: '',
      isAddFeedModal: false
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

  openAddFeedModal = () => {
    this.setState({
      isAddFeedModal: true
    });
  };

  closeAddFeedModal = () => {
    console.log('close');
    this.setState({
      isAddFeedModal: false
    });
  };

  render() {
    const { googleId, isAddFeedModal } = this.state;

    return (
      <Query query={USER_DATA} variables={{ googleId }}>
        {({ loading, data, error }) => {
          if (loading) return <span>loading</span>;
          if (error) return <span>error</span>;

          if (data.user === null) return <Redirect to="/" />;

          const { feed } = data.user;

          const feedLink = feed.map(v => {
            return (
              <li key={v.feedUrl}>
                <a href={v.feedUrl} target="_blank" rel="noopener noreferrer">
                  {v.title}
                </a>
              </li>
            );
          });

          return (
            <React.Fragment>
              <div id="User">
                <div className="user-inner">
                  <div className="left">
                    <div className="header">
                      <div className="add-feed">
                        <Fa icon={faPlus} onClick={this.openAddFeedModal} />
                      </div>
                      <div className="setting">
                        <Fa icon={faCog} />
                      </div>
                    </div>
                    <div className="content">
                      <ul>{feedLink}</ul>
                    </div>
                  </div>
                  <div className="right">
                    <div className="header" />
                    <div className="content" />
                  </div>
                </div>
              </div>
              {isAddFeedModal ? <AddFeedModal close={this.closeAddFeedModal} /> : null}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
