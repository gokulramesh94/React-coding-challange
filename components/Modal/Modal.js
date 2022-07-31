import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';

const CustomModal = ({ children, modalstate, handleModalClose }) => {
  return (
    <Modal
      open={modalstate}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
};

Modal.propTypes = {
  modalstate: PropTypes.bool,
  handleModalClose: PropTypes.func
};

export default memo(CustomModal);
