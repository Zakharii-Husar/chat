import { ReactNode } from "react";
import { MDBTextArea } from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppSelectorAndDispatch";
import updateBioThunk from "../../thunks/updateBioThunk";

const UpdateBio: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bio, setBio] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const updateBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setBio(newValue);
  };

  const cancel = () => {
    setShow(false);
  };

  const visibility = () => {
    setShow(true);
  };

  const submit = () => {
    dispatch(updateBioThunk(bio));
    setShow(false);
  };

  return (
    <div className="static-modal m-2">
      <span onClick={visibility}>{children}</span>
      <Modal show={show} animation={false} backdrop={true} keyboard={true}>
        <Modal.Header>
          <Modal.Title>Enter new bio: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBTextArea
            onChange={updateBio}
            label="Message"
            id="textAreaExample"
            rows={4}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-between">
          <Button className="bg-danger" onClick={cancel}>
            CANCEL
          </Button>
          <Button onClick={submit}>SUBMIT</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateBio;
