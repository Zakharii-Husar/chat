import { useState, ReactNode } from "react";
import { Modal, Button } from 'react-bootstrap';

const Confirmation: React.FC<{children: ReactNode; titleText: string; proceed: () => void }> = ({
  titleText,
  proceed,
  children
}) => {
  const [show, setShow] = useState(false);


  const confirm = () => {
    proceed();
    setShow(false);
  };

  const cancel = () => {
    setShow(false);
  };

  const visibility = () => {
    setShow(true);
  }

  return (
    <div className="static-modal w-100">
      <span onClick={visibility}>{children}</span>
      <Modal show={show} animation={false} backdrop={true} keyboard={true}>
        <Modal.Header>
          <Modal.Title>{titleText}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={cancel}>CANCEL</Button>
          <Button onClick={confirm}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Confirmation;
