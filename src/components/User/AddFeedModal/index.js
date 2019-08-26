/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

class AddFeedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddCategory: false,
      linkValue: '',
      isLinkTyping: false,
      linkVerification: false,
      pendingLinkVertification: false
    };
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
      linkValue: currentValue,
      isLinkTyping: true
    });
    this.handleSubmitActive(false);

    setTimeout(() => {
      const { linkValue } = this.state;

      if (linkValue === currentValue) {
        this.setState({
          isLinkTyping: false,
          pendingLinkVertification: true
        });

        fetch(`/api/getfeed?url=${currentValue}`)
          .then(res => {
            if (res.status === 200) {
              this.setState({
                linkVerification: true,
                pendingLinkVertification: false
              });
              this.handleSubmitActive(true);
            } else {
              this.setState({
                linkVerification: false,
                pendingLinkVertification: false
              });
              this.handleSubmitActive(false);
            }
          })
          .catch(() => {
            this.setState({
              linkVerification: false,
              pendingLinkVertification: false
            });
            this.handleSubmitActive(false);
          });
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

  handleAddFeedSubmit = () => {
    console.log(`handleAddFeedSubmit()`);
  };

  render() {
    const { close } = this.props;
    const {
      isAddCategory,
      linkValue,
      isLinkTyping,
      linkVerification,
      pendingLinkVertification
    } = this.state;

    let linkMsg = (
      <div className="alert alert-info" role="alert">
        Feed 주소 또는 해당 사이트 주소를 입력해주세요.
      </div>
    );

    if (linkValue.length) {
      linkMsg = (
        <div className="alert alert-secondary" role="alert">
          Feed 주소를 확인 중입니다.
        </div>
      );

      if (!isLinkTyping && !pendingLinkVertification) {
        if (linkVerification) {
          linkMsg = (
            <div className="alert alert-success" role="alert">
              Feed 주소가 확인되었습니다.
            </div>
          );
        } else {
          linkMsg = (
            <div className="alert alert-danger" role="alert">
              Feed 주소를 확인 할 수 없습니다, 주소를 확인해주세요.
            </div>
          );
        }
      }
    }

    return (
      <React.Fragment>
        <div className="modal-layout" onClick={close} role="button" tabIndex="0" />
        <div id="AddFeedModal">
          <div className="header">
            <h1 className="title">Add Feed</h1>
            <button type="button" className="close" onClick={close}>
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
                  onChange={e => this.handleLinkValue(e)}
                />
              </div>

              <div className="link-msg">{linkMsg}</div>
            </div>
            <div className="feed-category">
              <h2>Category</h2>
              <div className="category-select">
                {!isAddCategory ? (
                  <select name="category">
                    <option value="root">No Category</option>
                    <option value="foo1">foo1</option>
                    <option value="foo2">foo2</option>
                    <option value="foo3">foo3</option>
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
            <button
              type="button"
              className="btn btn-primary add-feed-btn"
              onClick={this.handleAddFeedSubmit}
              // disabled
            >
              Add Feed
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddFeedModal.propTypes = {
  close: PropTypes.func.isRequired
};

export default AddFeedModal;
