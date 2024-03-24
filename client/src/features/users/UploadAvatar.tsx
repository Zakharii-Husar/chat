import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBFile,
  MDBContainer,
  MDBBtnGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { MdAddCircle } from "react-icons/md";
import { useState, ChangeEvent, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppSelectorAndDispatch";
import uploadAvatarThunk from "./uploadAvatarThunk";

const UploadAvatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedAvatar(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedAvatar) {
      const formData = new FormData();
      formData.append("avatar", selectedAvatar);
      dispatch(uploadAvatarThunk(formData));
    }else{
        alert("Select image!");
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-end align-items-center"
    >
      <MdAddCircle
        className="position-absolute"
        onClick={() => setShowForm(true)}
        size={25}
        color="green"
        cursor={"pointer"}
      />

      {showForm && (
        <MDBCard className="position-absolute top-50 start-50 translate-middle">
          <MDBCardHeader>File Upload</MDBCardHeader>
          <MDBCardBody>
            <h3>Choose avatar:</h3>
            <MDBFile
              onChange={handleFileChange}
              label="Default file input example"
              id="customFile"
            />
          </MDBCardBody>
          <button
            className="btn bg-danger btn-light position-absolute top-0 end-0 m-3"
            onClick={() => setShowForm(false)}
            style={{ zIndex: "2" }}
          >
            <MDBIcon icon="times" />
          </button>
          <button
          onClick={handleUpload}
            type="button"
            className="btn btn-primary"
            data-mdb-ripple-init
          >
            Upload
          </button>
        </MDBCard>
      )}
    </MDBContainer>
  );
};

export default UploadAvatar;
