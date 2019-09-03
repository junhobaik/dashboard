/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

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
          <div className="content">content</div>
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
