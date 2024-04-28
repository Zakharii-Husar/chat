import { useState, ReactNode } from "react";
import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

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
      <MDBModal show={show} animation={false} backdrop={true} keyboard={true}>
        <MDBModalHeader>
          <MDBModalTitle>{titleText}</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalFooter>
          <MDBBtn onClick={cancel}>CANCEL</MDBBtn>
          <MDBBtn onClick={confirm}>OK</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
  );
};

export default Confirmation;
