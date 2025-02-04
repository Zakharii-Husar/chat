import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import './Confirmation.scss';

interface Props {
  children: React.ReactNode;
  titleText: string;
  proceed: () => void;
}

const Confirmation: React.FC<Props> = ({ children, titleText, proceed }) => {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    proceed();
    setShow(false);
  };

  return (
    <>
      <span onClick={() => setShow(true)}>{children}</span>

      <Modal 
        show={show} 
        onHide={() => setShow(false)}
        className="confirmation-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="confirmation-modal__title">
            <FaExclamationTriangle className="confirmation-modal__icon" />
            Confirm Action
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="confirmation-modal__message">{titleText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShow(false)}
            className="confirmation-modal__cancel"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleConfirm}
            className="confirmation-modal__confirm"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Confirmation;
