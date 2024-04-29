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
  isGroup: boolean;
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
  const genericAvatar = isGroup ? (
    <FaPeopleGroup className="generic" size={avatarState.genericSize} />
  ) : (
    <FaUserAlt className="generic" size={avatarState.genericSize} />
  );

  return (
    <div
      style={{
        width: avatarState.photoSize,
        height: avatarState.photoSize,
        minWidth: avatarState.photoSize,
        minHeight: avatarState.photoSize,
        zIndex: "1",
        border: "1px solid black",
        borderRadius: avatarState.radius,
        overflow: "hidden",
        background: "black",
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
      {editBtn ? <UploadAvatar /> : null}
    </div>
  );
};

export default Avatar;
