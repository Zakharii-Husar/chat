import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBFile,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { MdModeEdit } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";

const UploadAvatar: React.FC<{ hasAvatar: boolean }> = ({ hasAvatar }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <MDBContainer className="d-flex justify-content-end">
        {!showForm ? <MdAddCircle onClick={()=>setShowForm(true)} className="d-flex" size={25} color="green" cursor={"pointer"}/> :
      <MDBRow className="position-absolute w-80 top-0 start-50">
        <MDBCard>
          <MDBCardHeader>File Upload</MDBCardHeader>
          <MDBCardBody>
            <h3>Choose file:</h3>
            <MDBFile label="Default file input example" id="customFile" />
          </MDBCardBody>
          <button
            className="btn bg-danger btn-light position-absolute top-0 end-0 m-3"
            onClick={() => setShowForm(false)}
            style={{ zIndex: "2" }}
          >
            <MDBIcon icon="times" />
          </button>
        </MDBCard>
      </MDBRow>
}
</MDBContainer>
  );
};

export default UploadAvatar;
