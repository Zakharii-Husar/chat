import { Button } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';
import './CloseButton.scss';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = '' }) => {
  return (
    <Button 
      variant="link" 
      onClick={onClick}
      className={`close-button ${className}`}
    >
      <FiX />
    </Button>
  );
};

export default CloseButton; 