import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState } from "react";

const Confirmation: React.FC<{ buttonText: string; titleText: string; proceed: () => void }> = ({
  buttonText,
  titleText,
  proceed,
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
    <Container fluid className="static-modal w-100">
      <span onClick={visibility}>{buttonText}</span>
      <Modal show={show} animation={false} backdrop={true} keyboard={true}>
        <Modal.Header>
          <Modal.Title>{titleText}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={cancel}>CANCEL</Button>
          <Button onClick={confirm}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Confirmation;
