import { GET_AVATAR } from "../../redux/thunks/APIEndpoints";
import { FaUserAlt } from "react-icons/fa";

import { FaPeopleGroup } from "react-icons/fa6";
import { useState, useEffect } from "react";
import UploadAvatar from "./UploadAvatar";
import { Image } from "react-bootstrap";
const Avatar: React.FC<{
  size: string;
  fileName: string | null;
  editBtn: boolean;
  isGroup: boolean
}> = ({ size, fileName, editBtn = false, isGroup = false }) => {

  const mediumSize = {
    photoSize: "50px",
    radius: "50%",
    genericSize: 45,
  };

  const [avatarState, setAvatarState] = useState(mediumSize);
  const hasAvatar = fileName !== null;
  useEffect(() => {
    switch (size) {
      case "L":
        setAvatarState({ photoSize: "150px", radius: "5px", genericSize: 150 });
        break;
      case "S":
        setAvatarState({ photoSize: "30px", radius: "50%", genericSize: 25 });
        break;
      default:
        setAvatarState(mediumSize);
    }
  }, []);
  return (
    <div
      style={{
        width: avatarState.photoSize,
        height: avatarState.photoSize,
        minWidth: avatarState.photoSize,
        minHeight: avatarState.photoSize,
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
            width: avatarState.photoSize,
            minHeight: avatarState.photoSize,
            zIndex: "1",
          }}
        >
          {isGroup ? <FaPeopleGroup size={avatarState.genericSize} /> :
          <FaUserAlt size={avatarState.genericSize} />}
          
        </span>
      ) : (
        <Image
          className="w-100"
          src={GET_AVATAR(fileName ?? "")}
          alt="Avatar"
          fluid
          style={{
            width: avatarState.photoSize,
            minHeight: avatarState.photoSize,
            zIndex: "1",
          }}
        />
      )}
      {editBtn ? <UploadAvatar /> : null}
    </div>
  );
};

export default Avatar;
