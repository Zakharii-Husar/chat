import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBFile,
  MDBContainer,
} from "mdb-react-ui-kit";
import { MdAddCircle } from "react-icons/md";
import { useState, ChangeEvent } from "react";
import { useAppDispatch } from "../../hooks/useAppSelectorAndDispatch";
import uploadAvatarThunk from "../../redux/thunks/uploadAvatarThunk";

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

  const isValidImage = (file: File | null): boolean => {
    // Check if file exists
    if (!file) {
      alert("Please select an image!");
      return false;
    }

    // Check file size (5MB limit)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      alert("Image size exceeds 5MB limit!");
      return false;
    }

    // Check file format
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];
    if (!allowedFormats.includes(file.type)) {
      alert(
        "Invalid file format! Only .png, .jpg, .jpeg, or .gif formats are allowed."
      );
      return false;
    }

    return true;
  };

  const handleUpload = () => {
    if (isValidImage(selectedAvatar)) {
      const formData = new FormData();
      if (selectedAvatar) {
        formData.append("avatar", selectedAvatar);
        dispatch(uploadAvatarThunk(formData));
      } else {
        alert("Selected avatar is null!");
      }
    }
    setShowForm(false);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-end align-items-center"
    >
      <MdAddCircle
        className="position-absolute bg-white rounded"
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
              label="Allowed png, jpg, jpeg, gif up to 5MB"
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
