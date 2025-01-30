import { Container } from "react-bootstrap";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { IoIosMail } from "react-icons/io";
import Avatar from "../reusable/Avatar/Avatar";
import "./AppHeader.scss";

export const AppHeader: React.FC = () => {
  useCheckAuth();
  const currentUser = useAppSelector((state) => state.loggedInUser);
  const chats = useAppSelector((state) => state.chats.chats);
  
  const unreadCount = chats.filter(chat => 
    chat.senderId !== currentUser.id && 
    chat.seenBy.length === 0
  ).length;

  const displayCount = unreadCount > 9 ? "9+" : unreadCount;

  return (
    <header className="app-header">
      <Container>
        <div className="app-header__left">
          {currentUser.id && (
            <Link to={`/users/${currentUser.userName}`} className="app-header__link">
              <Avatar 
                size="M"
                fileName={currentUser.avatarName ?? null}
                isGroup={false}
              />
            </Link>
          )}
        </div>

        <Link to="/" className="app-header__logo">
          <TiMessages size={32} className="app-header__icon" />
          Chat App
        </Link>
        
        <div className="app-header__right">
          {currentUser.id && (
            <Link to="/chats" className="app-header__link">
              <div className="notification-wrapper">
                <IoIosMail size={32} className="app-header__icon" />
                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {displayCount}
                  </span>
                )}
              </div>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};
