import React, { Component } from 'react';
import { Query } from 'react-apollo';
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

            // eslint-disable-next-line one-var
            const feedListEl = [];
            const itemListEl = [];

            // if(loading)
            if (error) return <span>Error..!</span>;

            if (data.user) {
              const { feedList } = data.user;

              feedList.map(feed => {
                feedListEl.push(
                  <li className="feed" key={feed.link}>
                    <a href={feed.link} target="_blank" rel="noopener noreferrer">
                      {feed.title}
                    </a>
                  </li>
                );

                feed.items.map(item => {
                  const unixDate = `${item.isoDate.slice(0, 10)}.${item.isoDate.slice(9, 12)}`;

                  itemListEl.push(
                    <li className="item" key={item.link}>
                      <h3 className="item-title">
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </h3>
                      <div className="item-feed-info">
                        <span className="item-feed-link">
                          <a href={feed.link} target="_blank" rel="noopener noreferrer">
                            {feed.title}
                          </a>
                        </span>
                        <span className="item-date">
                          {moment.unix(unixDate).format('YYYY-MM-DD')}
                        </span>
                      </div>
                      <div className="item-content-snippet">
                        <span>{`${item.contentSnippet.slice(0, 120)}...`}</span>
                      </div>
                    </li>
                  );
                  return null;
                });
                return null;
              });
            }

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
                    <div className="content">
                      <ul className="feed-list">{feedListEl}</ul>
                    </div>
                  </div>
                  <div className="right">
                    <div className="header">
                      <input type="text" id="searchItem" placeholder="Search item" />
                    </div>
                    <div className="content">
                      <ul className="item-list">{itemListEl}</ul>
                    </div>
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
