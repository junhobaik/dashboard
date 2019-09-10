/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCog, faPlus, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import './index.scss';
import { sortCategory } from '../../utils';
import { FEED_DATA, TOGGLE_HIDE_FEED_ITEMS } from '../../queries';
import AddFeedModal from './AddFeedModal';
import SetFeedModal from './SetFeedModal';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddFeedModal: false,
      isSetFeedModal: false
    };
  }

  openAddFeedModal = () => {
    this.setState({
      isAddFeedModal: true
    });
  };

  openSetFeedModal = () => {
    this.setState({
      isSetFeedModal: true
    });
  };

  closeAddFeedModal = () => {
    this.setState({
      isAddFeedModal: false
    });
  };

  closeSetFeedModal = () => {
    this.setState({
      isSetFeedModal: false
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
    const { isAddFeedModal, isSetFeedModal } = this.state;

    return (
      <div id="Board">
        <Query query={FEED_DATA}>
          {({ loading, data, error, refetch }) => {
            // console.log('Board <Qeury />', data);

            const feedListEl = [];
            const itemListEl = [];
            let categoryList = new Set();
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

            if (data && data.user) {
              const { feedList } = data.user;

              feedList.sort((a, b) => {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
              });

              feedList.map(feed => {
                categoryList.add(feed.category);

                feedListEl.push(
                  <li className="feed" key={feed.link} category={feed.category}>

                    <a className="feed-title-btn-wrap-a" href={feed.link} target="_blank" rel="noopener noreferrer">
                      <button type="button" className="feed-title-btn">
                        {feed.title}
                      </button>
                    </a>

                    <Mutation mutation={TOGGLE_HIDE_FEED_ITEMS}>
                      {/* eslint-disable-next-line no-shadow */}
                      {(toggleHideFeedItems, { loading, data, error }) => {
                        // console.log('Board <Mutation />', loading, data);

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

            categoryList = sortCategory(Array.from(categoryList));

            const categoryEl = categoryList.map(c => {
              return (
                <ul className="category" key={c}>
                  {c === 'root' ? null : <h2>{`${c}`}</h2>}
                  {feedListEl.filter(v => {
                    return v.props.category === c;
                  })}
                </ul>
              );
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
                        <Fa icon={faCog} onClick={this.openSetFeedModal} />
                      </div>
                    </div>
                    <div className="content">
                      <ul className="feed-list">{categoryEl}</ul>
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
                  <AddFeedModal
                    close={this.closeAddFeedModal}
                    refetch={refetch}
                    categoryList={categoryList}
                  />
                ) : null}
                {isSetFeedModal ? (
                  <SetFeedModal close={this.closeSetFeedModal} refetch={refetch} />
                ) : null}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
