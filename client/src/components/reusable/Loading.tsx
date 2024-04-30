import { BiLoaderCircle } from "react-icons/bi";
import { Spinner } from "react-bootstrap";

const Loading: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
