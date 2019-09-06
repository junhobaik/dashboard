/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrashAlt, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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

const DELETE_FEED_LIST_ITEM = gql`
  mutation DeleteFeedListItem($id: String!) {
    deleteFeedListItem(id: $id) {
      response
    }
  }
`;

const SetFeedModal = ({ close, refetch }) => {
  const [deleteFeedListItem, { data }] = useMutation(DELETE_FEED_LIST_ITEM);

  const focusSelect = e => {
    const target = e.currentTarget;
    target.setAttribute('past-value', target.value);
  };

  const changeSelect = e => {
    const target = e.currentTarget;

    if (target.value === 'new') {
      const newCategory = target.parentNode.querySelector('.feed-category-new');
      target.style.display = 'none';
      if (newCategory) newCategory.style.display = 'inline-block';
    }
  };

  const cancelNewCategory = e => {
    const parent = e.currentTarget.parentNode;
    const select = parent.parentNode.querySelector('.feed-category-edit');
    const pastSelectValue = select.attributes['past-value'].value;

    // hide new categroy input
    parent.style.display = 'none';
    // show category select
    parent.parentNode.querySelector('.feed-category-edit').style.display = 'inline-block';
    // reset new category input
    parent.querySelector('input').value = '';
    // revert select value
    select.value = pastSelectValue;
  };

  const saveCategory = (id, value) => {};

  const saveNewCategory = () => {
    // saveCategory(id, value)
  };

  const editFeedTitle = () => {};

  const deleteFeedFn = (id, refetch) => {
    deleteFeedListItem({ variables: { id } }).then(({ data }) => {
      if (data.deleteFeedListItem.response) refetch();
    });
  };

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
            {({ loading, data, error, refetch }) => {
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
                          <div className="feed-inner-inner">
                            <div className="category-edit-wrap">
                              <select
                                className="feed-category-edit"
                                defaultValue={c}
                                onFocus={focusSelect}
                                onChange={changeSelect}
                              >
                                {a.map(v => {
                                  const optionText = v === 'root' ? 'no category' : v;
                                  return (
                                    <option value={v} key={`${v}-option`}>
                                      {optionText}
                                    </option>
                                  );
                                })}
                                <option value="new">new category</option>
                              </select>

                              <div className="feed-category-new" style={{ display: 'none' }}>
                                <input type="text" id="newCategory" placeholder="new category" />
                                <button
                                  type="button"
                                  className="save-new-category-btn"
                                  onClick={saveNewCategory}
                                >
                                  <Fa icon={faSave} />
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelNewCategory}
                                  className="cancel-new-category-btn"
                                >
                                  <Fa icon={faTimes} />
                                </button>
                              </div>
                            </div>
                            <input
                              className="title-edit-input"
                              type="text"
                              value={f.title}
                              onChange={() => {}}
                            />
                            <button className="feed-edit" type="button" onClick={editFeedTitle}>
                              <Fa icon={faEdit} />
                            </button>
                            <button
                              className="feed-delete"
                              type="button"
                              onClick={() => deleteFeedFn(f.feedId, refetch)}
                            >
                              <Fa icon={faTrashAlt} />
                            </button>
                          </div>
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
                            <input type="text" value={c} onChange={() => {}} />
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
                  </ul>
                </React.Fragment>
              );
            }}
          </Query>
        </div>
      </div>
    </React.Fragment>
  );
};

SetFeedModal.propTypes = {
  close: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

SetFeedModal.defaultProps = {};

export default SetFeedModal;
