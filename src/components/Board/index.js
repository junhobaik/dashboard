/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import './index.scss';
import { FEED_DATA } from '../../queries';
import AddFeedModal from './AddFeedModal';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddFeedModal: false
    };
  }

  openAddFeedModal = () => {
    this.setState({
      isAddFeedModal: true
    });
  };

  closeAddFeedModal = () => {
    this.setState({
      isAddFeedModal: false
    });
  };

  render() {
    const { isAddFeedModal } = this.state;

    return (
      <div id="Board">
        <Query query={FEED_DATA}>
          {({ loading, data, error, refetch }) => {
            console.log('Board <Qeury />', loading, data, error);

            // if(loading)
            if (error) return <span>Error..!</span>;

            return (
              <React.Fragment>
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
                    <div className="content">{/* <ul className="feed-list">{feedList}</ul> */}</div>
                  </div>
                  <div className="right">
                    <div className="header">
                      <input type="text" id="searchItem" placeholder="Search item" />
                    </div>
                    <div className="content">{/* <ul className="item-list">{itemList}</ul> */}</div>
                  </div>
                </div>
                ;
                {isAddFeedModal ? (
                  <AddFeedModal close={this.closeAddFeedModal} refetch={refetch} />
                ) : null}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
