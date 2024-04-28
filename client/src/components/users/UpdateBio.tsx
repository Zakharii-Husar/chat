import { ReactNode } from "react";
import {
  MDBModal,
  MDBModalTitle,
  MDBModalFooter,
  MDBBtn,
  MDBTextArea,
  MDBCardHeader,
  MDBModalBody
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppSelectorAndDispatch";
import updateBioThunk from "../../redux/thunks/updateBioThunk";

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
      <MDBModal show={show} animation={false} backdrop={true} keyboard={true}>
        <MDBCardHeader>
          <MDBModalTitle>Enter new bio: </MDBModalTitle>
        </MDBCardHeader>
        <MDBModalBody>
          <MDBTextArea
            onChange={updateBio}
            label="Message"
            id="textAreaExample"
            rows={4}
          />
        </MDBModalBody>
        <MDBModalFooter className="d-flex flex-row justify-content-between">
          <MDBBtn className="bg-danger" onClick={cancel}>
            CANCEL
          </MDBBtn>
          <MDBBtn onClick={submit}>SUBMIT</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
  );
};

export default UpdateBio;
