/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faPlus,
  faEye,
  faEyeSlash,
  faSpinner,
  faBookOpen,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import {
  faEye as faEyeRegular,
  faEyeSlash as faEyeSlashRegular
} from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import './index.scss';
import { sortCategory } from '../../utils';
import {
  FEED_DATA,
  TOGGLE_HIDE_FEED_ITEMS,
  READ_FEED_ITEM,
  UNREAD_FEED_ITEM,
  TOGGLE_HIDE_CATEGORY
} from '../../queries';
import AddFeedModal from './AddFeedModal';
import SetFeedModal from './SetFeedModal';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddFeedModal: false,
      isSetFeedModal: false,
      searchValue: ''
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
    const { isAddFeedModal, isSetFeedModal, searchValue } = this.state;

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
            let hideCategories;

            if (!loading) {
              loadingStyle.opacity = 0;

              setTimeout(() => {
                this.hideLoadingLayout();
              }, loadingTransition + 10);
            }

            if (error) return <span>Error..!</span>;

            if (data && data.user) {
              const { feedList, hideCategoryList } = data.user;
              hideCategories = hideCategoryList;

              feedList.sort((a, b) => {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
              });

              feedList.map(feed => {
                categoryList.add(feed.category);
                const ishideCategory = hideCategoryList.indexOf(feed.category) > -1;

                feedListEl.push(
                  <li className="feed" key={feed.link} category={feed.category}>
                    <a
                      className="feed-title-btn-wrap-a"
                      href={feed.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button type="button" className="feed-title-btn">
                        {feed.title}
                      </button>
                    </a>
                    <div className="feed-visible-toggle-btn-wrap">
                      {!ishideCategory ? (
                        <Mutation mutation={TOGGLE_HIDE_FEED_ITEMS}>
                          {(toggleHideFeedItems, { loading, data, error }) => {
                            // console.log('Board <Mutation />', loading, data);

                            let feedEyeIcon = feed.isHideItems ? faEyeSlashRegular : faEyeRegular;

                            if (loading) feedEyeIcon = faSpinner;
                            if (data) {
                              feedEyeIcon = data.toggleHideFeedItems.response
                                ? faEyeSlashRegular
                                : faEyeRegular;
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
                      ) : null}
                    </div>
                  </li>
                );

                if (!feed.isHideItems && !ishideCategory) {
                  feed.items.map(item => {
                    const createItem = () => {
                      const isReaded = feed.readedItem.indexOf(item._id) > -1;
                      const unixDate = `${item.isoDate.slice(0, 10)}.${item.isoDate.slice(9, 12)}`;
                      const date = moment.unix(unixDate);

                      itemListEl.push(
                        <li
                          className={`item ${isReaded ? 'readed-item' : null}`}
                          key={item.link}
                          date={item.isoDate}
                        >
                          <div className="item-header">
                            <h3 className="item-title">
                              <Mutation mutation={READ_FEED_ITEM}>
                                {(readFeedItem, { loading, data, error }) => {
                                  return (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => {
                                        e.preventDefault();
                                        readFeedItem({
                                          variables: { feedId: feed.feedId, itemId: item._id }
                                        }).then(res => {
                                          if (res.data.readFeedItem.response) refetch();
                                        });
                                        window.open(item.link, '_blank');
                                      }}
                                    >
                                      {item.title}
                                    </a>
                                  );
                                }}
                              </Mutation>
                            </h3>
                            <div className="item-readed-toggle">
                              <Mutation mutation={isReaded ? UNREAD_FEED_ITEM : READ_FEED_ITEM}>
                                {(toggleFeedItem, { loading, data, error }) => {
                                  let icon;
                                  let dataKey;

                                  if (isReaded) {
                                    icon = faBookOpen;
                                    dataKey = 'unreadFeedItem';
                                  } else {
                                    icon = faBook;
                                    dataKey = 'readFeedItem';
                                  }

                                  if (loading) icon = faSpinner;

                                  return (
                                    <button
                                      className="item-readed-button"
                                      type="button"
                                      onClick={() => {
                                        toggleFeedItem({
                                          variables: { feedId: feed.feedId, itemId: item._id }
                                        }).then(res => {
                                          if (res.data[dataKey].response) refetch();
                                        });
                                      }}
                                    >
                                      <Fa icon={icon} />
                                    </button>
                                  );
                                }}
                              </Mutation>
                            </div>
                          </div>
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
                    };

                    if (searchValue === '') {
                      return createItem();
                    }

                    if (
                      feed.title.indexOf(searchValue) !== -1 ||
                      item.title.indexOf(searchValue) !== -1
                    ) {
                      return createItem();
                    }
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
              const categoryName = c === 'root' ? 'No Category' : c;
              let isHideCategory = false;
              let icon;

              if (hideCategories && hideCategories.length) {
                isHideCategory = hideCategories.indexOf(c) > -1;
              }
              icon = isHideCategory ? faEyeSlash : faEye;

              const feedInCategory = feedListEl.filter(v => {
                return v.props.category === c;
              });

              return feedInCategory.length ? (
                <ul className="category" key={c}>
                  <div className="category-header">
                    <Mutation mutation={TOGGLE_HIDE_CATEGORY}>
                      {(toggleHideCategory, { loading, data, error }) => {
                        if (loading) icon = faSpinner;
                        return (
                          <React.Fragment>
                            <h2>{`${categoryName}`}</h2>
                            <div className="toggle-hide-category-button-wrap">
                              <button
                                type="button"
                                className="toggle-hide-category-button"
                                onClick={() => {
                                  toggleHideCategory({
                                    variables: { category: c, isHide: !isHideCategory }
                                  }).then(res => {
                                    if (res.data.toggleHideCategory.response) refetch();
                                  });
                                }}
                              >
                                <Fa icon={icon} />
                              </button>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </Mutation>
                  </div>
                  {feedInCategory}
                </ul>
              ) : null;
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
                      <input
                        type="text"
                        id="searchItem"
                        placeholder="Search item"
                        value={searchValue}
                        onChange={e => {
                          this.setState({ searchValue: e.target.value });
                        }}
                      />
                    </div>
                    <div className="content">
                      <ul className="item-list">{itemListEl}</ul>
                    </div>
                  </div>
                </div>

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
