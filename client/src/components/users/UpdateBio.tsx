import { ReactNode } from "react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppSelectorAndDispatch";
import updateBioThunk from "../../redux/thunks/updateBioThunk";
import { Modal, Button, Form } from 'react-bootstrap';
import CloseButton from '../reusable/CloseButton';

const UpdateBio: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bio, setBio] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const updateBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setBio(newValue);
  };

  const submit = () => {
    dispatch(updateBioThunk(bio));
    setShow(false);
  };

  return (
    <div className="static-modal m-2">
      <span onClick={() => setShow(true)} className="edit-bio-button">{children}</span>
      <Modal 
        show={show} 
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Enter new bio:</Modal.Title>
          <CloseButton onClick={() => setShow(false)} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Up to 50 characters</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              onChange={updateBio}
              className="form-input"
              maxLength={50}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={submit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateBio;
