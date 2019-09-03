/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

const SET_FEED = gql`
  {
    user {
      feedList {
        feedId
        title
        category
      }
    }
  }
`;

class SetFeedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { close, refetch } = this.props;

    return (
      <React.Fragment>
        <div
          className="modal-layout"
          onClick={() => {
            refetch();
            close();
          }}
          role="button"
          tabIndex="0"
        />
        <div id="SetFeedModal">
          <div className="header">
            <h1 className="title">Feed Setting</h1>
            <button
              type="button"
              className="close"
              onClick={() => {
                refetch();
                close();
              }}
            >
              <Fa icon={faTimes} />
            </button>
          </div>
          <div className="content">
            <Query query={SET_FEED}>
              {({ loading, data, error }) => {
                console.log('SetFeedModal <Query />', loading, data, error);

                let categoryListEl;

                if (data) {
                  const { feedList } = data.user;
                  let category = new Set();

                  for (const feed of feedList) {
                    category.add(feed.category);
                  }

                  category = Array.from(category);
                  categoryListEl = category.map((c, i, a) => {
                    const feed = feedList.filter(f => f.category === c);

                    const feedListEl = feed.map(f => {
                      return (
                        <li className="feed" key={f.feedId}>
                          <div className="feed-inner">
                            <select id="feed-category-edit">
                              {a.map(v => {
                                const optionText = v === 'root' ? 'no category' : v;

                                if (v === c) {
                                  return (
                                    <option value={v} key={`${v}-option`} selected>
                                      {optionText}
                                    </option>
                                  );
                                }
                                return (
                                  <option value={v} key={`${v}-option`}>
                                    {optionText}
                                  </option>
                                );
                              })}
                            </select>
                            <input type="text" value={f.title} />
                            <button className="feed-edit" type="button">
                              <Fa icon={faEdit} />
                            </button>
                            <button className="feed-delete" type="button">
                              <Fa icon={faTrashAlt} />
                            </button>
                          </div>
                        </li>
                      );
                    });

                    return (
                      <li className="category-wrap-li" key={c}>
                        <div className="category">
                          {c === 'root' ? (
                            <div className="category-inner">
                              <input type="text" value="No Category" disabled />
                            </div>
                          ) : (
                            <div className="category-inner">
                              <input type="text" value={c} />
                              <button className="category-edit" type="button">
                                <Fa icon={faEdit} />
                              </button>
                              <button className="category-delete" type="button">
                                <Fa icon={faTrashAlt} />
                              </button>
                            </div>
                          )}
                          <ul className="feed-list">{feedListEl}</ul>
                        </div>
                      </li>
                    );
                  });
                }

                return (
                  <React.Fragment>
                    <ul className="category-list">
                      {categoryListEl}
                      <li className="category-wrap-li new-category">
                        <div className="category new-category">
                          <div className="category-inner">
                            <input type="text" placeholder="new category" />
                            <button type="button">
                              <Fa icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </React.Fragment>
                );
              }}
            </Query>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SetFeedModal.propTypes = {
  close: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

SetFeedModal.defaultProps = {};

export default SetFeedModal;
