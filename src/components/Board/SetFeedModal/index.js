/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
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

const CHANGE_CATEGORY_NAME = gql`
  mutation ChangeCategoryName($oldCategoryName: String!, $newCategoryName: String!) {
    changeCategoryName(oldCategoryName: $oldCategoryName, newCategoryName: $newCategoryName) {
      response
    }
  }
`;

const SetFeedModal = ({ close, refetch }) => {
  const [deleteFeedListItem] = useMutation(DELETE_FEED_LIST_ITEM);
  const [changeCategoryName] = useMutation(CHANGE_CATEGORY_NAME);
  const [feedTitleInputs, setFeedTitleInputs] = useState({});
  const [feedCategoryInputs, setFeedCategoryInputs] = useState({});
  const [categoryNameInputs, setCategoryNameInputs] = useState({});

  const updateTitleInputs = (key, value) => {
    setFeedTitleInputs({
      ...feedTitleInputs,
      [key]: value
    });
  };

  const updateCategoryInputs = (key, value) => {
    console.log(key, value);
    setFeedCategoryInputs({
      ...feedCategoryInputs,
      [key]: value
    });
  };

  const updateCategoryNameInputs = (key, value) => {
    console.log(key, value);
    setCategoryNameInputs({
      ...categoryNameInputs,
      [key]: value
    });
  };

  const focusCategorySelect = e => {
    const target = e.currentTarget;
    target.setAttribute('past-value', target.value);
  };

  const changeCategorySelect = e => {
    const target = e.currentTarget;

    if (target.value === 'new') {
      const newCategory = target.parentNode.querySelector('.feed-category-new');
      target.style.display = 'none';
      if (newCategory) newCategory.style.display = 'inline-block';
    } else {
      console.log('새로운 카테고리 선택', target.value);
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

  const deleteFeedFn = (id, refetch) => {
    deleteFeedListItem({ variables: { id } }).then(({ data }) => {
      if (data.deleteFeedListItem.response) refetch();
    });
  };

  const changeCategoryNameInput = e => {
    const { value, name } = e.currentTarget;

    updateCategoryNameInputs(name, value);
  };

  const chagneFeedCategoryInput = e => {
    const { value, name } = e.currentTarget;

    updateCategoryInputs(name, value);
  };

  const changeFeedTitleInput = e => {
    const { value, name } = e.currentTarget;

    updateTitleInputs(name, value);
  };

  const saveCategoryName = (e, oldCategoryName, refetch) => {
    const newCategoryName = categoryNameInputs[oldCategoryName];

    console.log(`카테고리명 ${oldCategoryName}에서 ${newCategoryName}으로 변경`);

    changeCategoryName({ variables: { oldCategoryName, newCategoryName } }).then(({ data }) => {
      if (data.changeCategoryName.response) refetch();
    });
  };

  const saveFeedCategory = (e, key) => {
    const category = feedCategoryInputs[key];
    const pastCategory = e.currentTarget.parentNode.parentNode.querySelector('.feed-category-edit')
      .attributes['past-value'].value;

    if (!category || category === pastCategory) {
      console.log('이름을 지정하지 않았거나 과거의 카테고리와 같음');
    } else {
      console.log('수정 될 카테고리', category);
    }
  };

  const saveFeedTitle = (e, key) => {
    const title = feedTitleInputs[key];
    console.log('수정 될 타이틀', title);
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
              // console.log('SetFeedModal <Query />', loading, data, error);

              let categoryListEl;

              if (data) {
                const { feedList } = data.user;
                let category = new Set();

                for (const feed of feedList) {
                  category.add(feed.category);
                }

                category = Array.from(category);
                categoryListEl = category.map((c, i, a) => {
                  const categoryNameModified = categoryNameInputs[c] && categoryNameInputs[c] !== c;

                  const feed = feedList.filter(f => f.category === c);

                  const feedListEl = feed.map(f => {
                    const titleModified =
                      feedTitleInputs[f.feedId] && feedTitleInputs[f.feedId] !== f.title;

                    return (
                      <li className="feed" key={f.feedId}>
                        <div className="feed-inner">
                          <div className="feed-inner-inner">
                            <div className="category-edit-wrap">
                              <select
                                className="feed-category-edit"
                                defaultValue={c}
                                onFocus={focusCategorySelect}
                                onChange={changeCategorySelect}
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
                                <input
                                  type="text"
                                  id="newCategory"
                                  placeholder="new category"
                                  value={feedCategoryInputs[f.feedId] || ''}
                                  name={f.feedId}
                                  onChange={chagneFeedCategoryInput}
                                />
                                <button
                                  type="button"
                                  className="save-new-category-btn"
                                  onClick={e => {
                                    saveFeedCategory(e, f.feedId);
                                  }}
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
                              value={feedTitleInputs[f.feedId] || ''}
                              name={f.feedId}
                              onChange={changeFeedTitleInput}
                              placeholder={f.title}
                            />
                            <button
                              className="feed-edit"
                              type="button"
                              onClick={e => {
                                if (titleModified) saveFeedTitle(e, f.feedId);
                              }}
                            >
                              <Fa icon={titleModified ? faSave : faEdit} />
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
                            <input
                              type="text"
                              value={categoryNameInputs[c] || ''}
                              name={c}
                              onChange={changeCategoryNameInput}
                              placeholder={c}
                            />
                            <button
                              className="category-edit"
                              type="button"
                              onClick={e => {
                                if (categoryNameModified) saveCategoryName(e, c, refetch);
                              }}
                            >
                              <Fa icon={categoryNameModified ? faSave : faEdit} />
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
                  <ul className="category-list">{categoryListEl}</ul>
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
