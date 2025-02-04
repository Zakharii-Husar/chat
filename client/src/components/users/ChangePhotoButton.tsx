import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks/useAppSelectorAndDispatch';
import uploadAvatarThunk from '../../redux/thunks/uploadAvatarThunk';
import { MdPhotoCamera } from 'react-icons/md';
import CloseButton from '../reusable/CloseButton';
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

      <Modal 
        show={showForm} 
        onHide={() => setShowForm(false)}
        className="photo-upload-modal"
        centered
      >
        <Modal.Header>
          <Modal.Title>Change Profile Photo</Modal.Title>
          <CloseButton onClick={() => setShowForm(false)} />
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Select new photo (max 5MB)</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/gif"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={handleUpload}
            disabled={!selectedAvatar}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangePhotoButton;