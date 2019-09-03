/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import './index.scss';
import { FEED_DATA } from '../../queries';
import AddFeedModal from './AddFeedModal';

const TOGGLE_HIDE_FEED_ITEMS = gql`
  mutation toggleHideFeedItems($feedId: String!, $isHide: Boolean!) {
    toggleHideFeedItems(feedId: $feedId, isHide: $isHide) {
      response
    }
  }
`;

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

  hideLoadingLayout = () => {
    if (document.querySelector('.loading')) {
      document.querySelector('.loading').style.display = 'none';
    } else {
      setTimeout(() => {
        this.hideLoadingLayout();
      }, 100);
    }
  };

  render() {
    const { isAddFeedModal } = this.state;

    return (
      <div id="Board">
        <Query query={FEED_DATA}>
          {({ loading, data, error, refetch }) => {
            console.log('Board <Qeury />', data);

            const feedListEl = [];
            const itemListEl = [];
            const loadingTransition = 300;
            const loadingStyle = {
              transition: `${loadingTransition}ms`,
              opacity: 1
            };

            if (!loading) {
              loadingStyle.opacity = 0;

              setTimeout(() => {
                this.hideLoadingLayout();
              }, loadingTransition + 10);
            }

            if (error) return <span>Error..!</span>;

            if (data.user) {
              const { feedList } = data.user;

              feedList.map(feed => {
                feedListEl.push(
                  <li className="feed" key={feed.link}>
                    <button type="button" className="feed-title-btn">
                      <a href={feed.link} target="_blank" rel="noopener noreferrer">
                        {feed.title}
                      </a>
                    </button>

                    <Mutation mutation={TOGGLE_HIDE_FEED_ITEMS}>
                      {/* eslint-disable-next-line no-shadow */}
                      {(toggleHideFeedItems, { loading, data, error }) => {
                        console.log('Board <Mutation />', loading, data);

                        let feedEyeIcon = feed.isHideItems ? faEyeSlash : faEye;

                        if (loading) feedEyeIcon = faSpinner;
                        if (data) {
                          feedEyeIcon = data.toggleHideFeedItems.response ? faEyeSlash : faEye;
                        }

                        return (
                          <button type="button" className="feed-visible-toggle-btn">
                            <Fa
                              icon={feedEyeIcon}
                              onClick={() => {
                                toggleHideFeedItems({
                                  variables: { feedId: feed.feedId, isHide: !feed.isHideItems }
                                }).then(() => {
                                  refetch();
                                });
                              }}
                            />
                          </button>
                        );
                      }}
                    </Mutation>
                  </li>
                );

                if (!feed.isHideItems) {
                  feed.items.map(item => {
                    const unixDate = `${item.isoDate.slice(0, 10)}.${item.isoDate.slice(9, 12)}`;
                    const date = moment.unix(unixDate);

                    itemListEl.push(
                      <li className="item" key={item.link} date={item.isoDate}>
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
                            {`${date.format('YYYY-MM-DD')} (${date.fromNow()})`}
                          </span>
                        </div>
                        <div className="item-content-snippet">
                          <span>{`${item.contentSnippet.slice(0, 120)}...`}</span>
                        </div>
                      </li>
                    );
                    return null;
                  });
                }
                return null;
              });
            }

            itemListEl.sort((a, b) => {
              return parseInt(b.props.date, 10) - parseInt(a.props.date, 10);
            });

            return (
              <React.Fragment>
                <div className="loading" style={loadingStyle}>
                  <div className="loading-icon">loading...</div>
                </div>
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
