import { MDBCardImage } from "mdb-react-ui-kit";
import { GET_AVATAR } from "../../thunks/APIEndpoints";
import { FaUserSecret } from "react-icons/fa6";
import { useAppSelector } from "../../hooks/useAppSelectorAndDispatch";
import { useState, useEffect } from "react";

const Avatar: React.FC<{ size: string }> = ({ size }) => {
  const defaultState = {
    size: "50px",
    radius: "50%",
  };
  const [avatarState, setAvatarState] = useState(defaultState);
  const user = useAppSelector((state) => state.loggedInUser);
  const hasAvatar = user.avatarName !== null;
  useEffect(()=>{
    switch (size) {
        case "L":
            setAvatarState({size: "150px", radius: "5px"});
            break;
        default: setAvatarState(defaultState);
      }
  }, [])
  return (
    <div
      className="mt-4 mb-2"
      style={{
        width: avatarState.size,
        height: avatarState.size,
        minHeight: avatarState.size,
        zIndex: "1",
        border: "3px solid white",
        borderRadius: avatarState.radius,
        overflow: "hidden",
        background: "black",
      }}
    >
      {!hasAvatar ? (
        <span
          className="w-100"
          style={{
            width: avatarState.size,
            minHeight: avatarState.size,
            zIndex: "1",
          }}
        >
          <FaUserSecret size={45} />
        </span>
      ) : (
        <MDBCardImage
          className="w-100"
          src={GET_AVATAR(user.avatarName!)}
          // onError={() => dispatch(updateAvatarName(null))}
          alt="Avatar"
          fluid
          style={{
            width: avatarState.size,
            minHeight: avatarState.size,
            zIndex: "1",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
