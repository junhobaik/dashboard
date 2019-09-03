/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
                  const category = new Set();

                  for (const feed of feedList) {
                    category.add(feed.category);
                  }

                  categoryListEl = Array.from(category).map(c => {
                    const feed = feedList.filter(f => f.category === c);

                    const feedListEl = feed.map(f => {
                      return (
                        <li className="feed" key={f.feedId}>
                          <input type="text" value={f.title} />
                          <button type="button">m</button>
                          <button type="button">d</button>
                        </li>
                      );
                    });

                    return (
                      <li className="category" key={c}>
                        <div className="category-inner-wrap">
                          <input type="text" value={c} />
                          <button type="button">m</button>
                          <button type="button">d</button>
                        </div>
                        <ul className="feed-list">{feedListEl}</ul>
                      </li>
                    );
                  });
                }

                return (
                  <React.Fragment>
                    <ul className="category-list">
                      {categoryListEl}
                      <li className="category new-category">
                        <input type="text" placeholder="new category" />
                        <button type="button">+</button>
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
