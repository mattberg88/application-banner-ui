import React, { FC, useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const BannersConfirmationModal: FC<{
  deleteId: number;
  modalState: any;
  onClose: (e: any) => void;
  onConfirm: (id: number) => void;
}> = ({ deleteId, modalState, onClose, onConfirm }) => {
  return (
    <Modal open={modalState} onClose={onClose}>
      <Header icon='exclamation circle' content='Delete Confirmation' />
      <Modal.Content>
        <p>Are you sure you want to delete Banner ID: {deleteId}?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>
          <Icon name='cancel' />
          Cancel
        </Button>
        <Button onClick={() => onConfirm(deleteId)} color='google plus'>
          <Icon name='trash' /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default BannersConfirmationModal;
