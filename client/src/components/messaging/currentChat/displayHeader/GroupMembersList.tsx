import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../../reusable/Avatar/Avatar';
import { IUser } from '../../../../Interfaces';
import { formatUtcToLocal } from '../../../../utils/dateUtils';
import CloseButton from '../../../reusable/CloseButton';
import './GroupMembersList.scss';

interface GroupMembersListProps {
  show: boolean;
  onHide: () => void;
  members: IUser[];
  adminId: string | null;
}

export const GroupMembersList: React.FC<GroupMembersListProps> = ({
  show,
  onHide,
  members,
  adminId,
}) => {
  const formatLastSeen = (lastVisit: Date | null) => {
    if (!lastVisit) return "Last seen unknown";
    return `Last seen ${formatUtcToLocal(lastVisit.toString())}`;
  };

  return (
    <Modal show={show} onHide={onHide} className="group-members-list">
      <Modal.Header>
        <Modal.Title>Group Members</Modal.Title>
        <CloseButton onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div className="members-container">
          {members.map((member) => (
            <Link 
              key={member.id} 
              to={`/users/${member.userName}`}
              className="member-item"
            >
              <div className={`member-avatar ${member.isOnline ? 'online' : ''}`}>
                <Avatar
                  size="S"
                  fileName={member.avatarName}
                  isGroup={false}
                />
              </div>
              <div className="member-info">
                <span className="member-name">
                  {member.userName}
                  {member.id === adminId && (
                    <span className="admin-badge">Admin</span>
                  )}
                </span>
                <span className="member-status">
                  {member.isOnline ? (
                    'Online'
                  ) : (
                    formatLastSeen(member.lastVisit)
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}; 