import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const AddFeedModal = ({ isOpen, close }) => {
  if (isOpen) {
    return (
      <React.Fragment>
        <div className="modal-layout" onClick={close} role="button" tabIndex="0" />
        <div id="AddFeedModal">
          <h1>Add Feed</h1>
        </div>
      </React.Fragment>
    );
  }
  return null;
};

AddFeedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default AddFeedModal;
