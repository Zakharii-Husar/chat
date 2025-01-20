import { GET_AVATAR } from "../../../redux/thunks/APIEndpoints";
import { FaUserAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import "./Avatar.scss";

const Avatar: React.FC<{
  size: string;
  fileName: string | null;
  isGroup: boolean;
}> = ({ size, fileName, isGroup = false }) => {
  const mediumSize = {
    photoSize: "40px",
    radius: "50%",
    genericSize: 40,
  };

  const [avatarState, setAvatarState] = useState(mediumSize);
  const hasAvatar = fileName !== null;
  useEffect(() => {
    switch (size) {
      case "L":
        setAvatarState({ photoSize: "150px", radius: "5px", genericSize: 150 });
        break;
      case "S":
        setAvatarState({ photoSize: "20px", radius: "50%", genericSize: 20 });
        break;
      default:
        setAvatarState(mediumSize);
    }
  }, []);
  const genericAvatar = isGroup ? (
    <FaPeopleGroup className="generic" size={avatarState.genericSize} />
  ) : (
    <FaUserAlt className="generic" size={avatarState.genericSize} />
  );

  return (
    <div
      className="Avatar d-flex flex-column"
      style={{
        width: avatarState.photoSize,
        height: avatarState.photoSize,
        minWidth: avatarState.photoSize,
        minHeight: avatarState.photoSize,
        borderRadius: avatarState.radius,
        fontSize: avatarState.genericSize
      }}
    >
      {!hasAvatar ? (
        genericAvatar
      ) : (
        <Image
          className="w-100"
          src={GET_AVATAR(fileName ?? "")}
          alt="Avatar"
          style={{
            width: avatarState.photoSize,
            minHeight: avatarState.photoSize,
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
