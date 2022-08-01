import { useState } from 'react';

export const useModal = (modalInitialState) => {
  const [modalstate, setmodalstate] = useState(modalInitialState || false);
  const handleModalOpen = () => setmodalstate(true);
  const handleModalClose = () => setmodalstate(false);

  return {
    modalstate,
    handleModalOpen,
    handleModalClose
  };
};
