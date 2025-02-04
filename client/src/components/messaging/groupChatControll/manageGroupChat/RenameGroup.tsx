import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useAppDispatch } from '../../../../hooks/useAppSelectorAndDispatch';
import renameGroupThunk from '../../../../redux/thunks/renameGroupThunk';
import CloseButton from '../../../reusable/CloseButton';
import './RenameGroup.scss';

const RenameGroup: React.FC = () => {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      await dispatch(renameGroupThunk(newName.trim()));
      setShow(false);
      setNewName('');
    }
  };

  return (
    <>
      <Button 
        variant="primary"
        onClick={() => setShow(true)}
        className="d-flex align-items-center gap-2"
      >
        <FaEdit />
        Rename Group
      </Button>

      <Modal 
        show={show} 
        onHide={() => setShow(false)}
        className="rename-group__modal"
        centered
      >
        <Modal.Header>
          <Modal.Title className="rename-group__title">
            <FaEdit className="rename-group__title-icon" />
            Rename Group
          </Modal.Title>
          <CloseButton onClick={() => setShow(false)} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter new group name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="rename-group__input"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShow(false)}
            className="rename-group__cancel"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            className="rename-group__confirm"
            disabled={!newName.trim()}
          >
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameGroup;
