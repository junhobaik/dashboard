/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import './index.scss';

const ADD_FEED = gql`
  mutation addFeed($url: String!, $category: String!) {
    addFeed(url: $url, category: $category) {
      response
    }
  }
`;

class AddFeedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddCategory: false,
      linkValue: '',
      linkMsg: 'Feed 주소를 입력해주세요.',
      linkMsgAlertLevel: 'info'
    };
  }

  componentDidMount() {
    this.handleSubmitActive(false);
  }

  toggleCategoryInput = () => {
    const { isAddCategory } = this.state;
    this.setState({
      isAddCategory: !isAddCategory
    });
  };

  handleLinkValue = e => {
    const currentValue = e.currentTarget.value;

    this.setState({
      linkValue: currentValue
    });
    this.handleSubmitActive(false);

    if (currentValue === '') {
      this.setState({
        linkMsg: 'Feed 주소를 입력해주세요.',
        linkMsgAlertLevel: 'info'
      });
    }

    setTimeout(() => {
      const { linkValue } = this.state;
      const httpIndexOf = linkValue.indexOf('http://') > -1 || linkValue.indexOf('https://') > -1;

      if (linkValue !== '' && linkValue === currentValue) {
        if (!httpIndexOf) {
          this.setState({
            linkMsg: '주소에는 http:// 또는 https://가 포함되어야 합니다.',
            linkMsgAlertLevel: 'warning'
          });
        } else {
          this.setState({
            linkMsg: 'Feed 주소를 확인 중입니다.',
            linkMsgAlertLevel: 'secondary'
          });

          fetch(`/api/getfeed?url=${currentValue}`)
            .then(res => {
              if (res.status === 200) {
                this.setState({
                  linkMsg: 'Feed 주소가 확인되었습니다.',
                  linkMsgAlertLevel: 'success'
                });
                this.handleSubmitActive(true);
              } else {
                this.setState({
                  linkMsg: 'Feed 주소를 확인 할 수 없습니다, 주소를 확인해주세요.',
                  linkMsgAlertLevel: 'danger'
                });
                this.handleSubmitActive(false);
              }
            })
            .catch(() => {
              this.setState({
                linkMsg: '죄송합니다. 알 수 없는 오류가 발생했습니다.',
                linkMsgAlertLevel: 'danger'
              });
              this.handleSubmitActive(false);
            });
        }
      }
    }, 1000);
  };

  handleSubmitActive = isActive => {
    const submitBtn = document.querySelector('.add-feed-btn');

    if (!isActive) {
      submitBtn.setAttribute('disabled', 'true');
    } else {
      submitBtn.removeAttribute('disabled');
    }
  };

  getCategory = () => {
    const { isAddCategory } = this.state;

    const categorySelect = document.querySelector('#categorySelect');

    let category;
    if (isAddCategory) {
      category = document.querySelector('#newCategory').value;
    } else {
      category = categorySelect[categorySelect.options.selectedIndex].value;
    }

    return category;
  };

  render() {
    const { close, refetch } = this.props;
    const { isAddCategory, linkValue, linkMsg, linkMsgAlertLevel } = this.state;

    const linkMsgEl = (
      <div className={`alert alert-${linkMsgAlertLevel}`} role="alert">
        {linkMsg}
      </div>
    );

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
        <div id="AddFeedModal">
          <div className="header">
            <h1 className="title">Add Feed</h1>
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
            <div className="feed-link">
              <div className="link-input">
                <h2>Feed URL</h2>
                <input
                  type="text"
                  id="feedLink"
                  placeholder="ex. http://site.com/rss"
                  value={linkValue}
                  autoComplete="off"
                  onChange={e => this.handleLinkValue(e)}
                />
              </div>

              <div className="link-msg">{linkMsgEl}</div>
            </div>
            <div className="feed-category">
              <h2>Category</h2>
              <div className="category-select">
                {!isAddCategory ? (
                  <select name="category" id="categorySelect">
                    <option value="root">No Category</option>
                    {/* <option value="foo1">foo1</option>
                    <option value="foo2">foo2</option>
                    <option value="foo3">foo3</option> */}
                  </select>
                ) : (
                  <input type="text" id="newCategory" placeholder="category name" />
                )}

                <div className="add-category-icon">
                  <Fa
                    className="add-category-btn"
                    icon={!isAddCategory ? faPlus : faTimes}
                    onClick={this.toggleCategoryInput}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="submit">
            <Mutation mutation={ADD_FEED}>
              {(addFeed, { loading, data, error }) => {
                let submitMsg;
                const submitFailMsg = (
                  <div className="alert alert-danger" role="alert">
                    Feed 추가에 실패했습니다.
                  </div>
                );

                if (loading) {
                  submitMsg = (
                    <div className="alert alert-secondary" role="alert">
                      Feed를 추가중입니다...
                    </div>
                  );
                }

                if (error) {
                  submitMsg = submitFailMsg;
                }

                if (data) {
                  if (data.addFeed.response) {
                    submitMsg = (
                      <div className="alert alert-success" role="alert">
                        Feed가 추가되었습니다.
                      </div>
                    );
                  } else {
                    submitMsg = submitFailMsg;
                  }
                }

                return (
                  <React.Fragment>
                    <div className="submit-msg">{submitMsg}</div>
                    <button
                      className="btn btn-primary add-feed-btn"
                      type="submit"
                      onClick={e => {
                        e.preventDefault();
                        addFeed({ variables: { url: linkValue, category: this.getCategory() } });
                      }}
                    >
                      Add Feed
                    </button>
                  </React.Fragment>
                );
              }}
            </Mutation>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddFeedModal.propTypes = {
  close: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

export default AddFeedModal;
