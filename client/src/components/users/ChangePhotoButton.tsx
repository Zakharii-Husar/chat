import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks/useAppSelectorAndDispatch';
import uploadAvatarThunk from '../../redux/thunks/uploadAvatarThunk';
import { MdPhotoCamera } from 'react-icons/md';
import './ChangePhotoButton.scss';

export const ChangePhotoButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setShowForm(false);
    }
  };

  return (
    <>
      <button 
        className="btn-change-photo"
        onClick={() => setShowForm(true)}
      >
        <MdPhotoCamera className="icon" />
        <span className="text">Change</span>
      </button>

      {showForm && (
        <Card className="photo-upload-modal">
          <Card.Header>Change Profile Photo</Card.Header>
          <Card.Body>
            <Form.Label>Select new photo (max 5MB)</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/gif"
            />
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="btn btn-primary"
              disabled={!selectedAvatar}
            >
              Upload
            </button>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default ChangePhotoButton;