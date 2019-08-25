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
      isLinkTyping: false
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

    setTimeout(() => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.linkValue === currentValue) {
        this.setState({
          isLinkTyping: false
        });

        fetch(`/api/getfeed?url=${currentValue}`).then(res => {
          console.log(res);
        });
      }
    }, 1000);
  };

  render() {
    const { isOpen, close } = this.props;
    const { isAddCategory, linkValue } = this.state;

    if (isOpen) {
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

                <div className="link-msg">
                  <div className="alert alert-info" role="alert">
                    Feed 주소 또는 해당 사이트 주소를 입력해주세요.
                  </div>
                </div>
              </div>
              <div className="feed-category">
                <h2>Category</h2>
                <div className="category-select">
                  {!isAddCategory ? (
                    <select name="category">
                      <option value="">category</option>
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
              <button type="button" className="btn btn-primary">
                Add Feed
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return null;
  }
}

AddFeedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default AddFeedModal;
