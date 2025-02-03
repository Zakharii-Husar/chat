import AddMembers from './AddMembers';
import RemoveMembers from './RemoveMembers';
import { Container, Row, Col } from 'react-bootstrap';
import './ManageMembers.scss';

const ManageMembers: React.FC = () => {
  return (
    <Container className="manage-members">
      <Row>
        <Col xs={12} md={6}>
          <AddMembers />
        </Col>
        <Col xs={12} md={6}>
          <RemoveMembers />
        </Col>
      </Row>
    </Container>
  );
};

export default ManageMembers; 