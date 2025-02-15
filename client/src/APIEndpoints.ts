// Get environment variables with fallbacks (the fallbacks are only for dev)
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5190/chat-api";
export const WS_URL = process.env.REACT_APP_WS_URL || "http://localhost:5190/Hub";

//AUTHORIZATION
//post
export const REGISTER_URL = () => `${API_URL}/Auth/SignUp/WithPass`;
//post
export const LOGIN_URL = () => `${API_URL}/Auth/SignIn/WithPass`;
//get
export const CHECK_COOKIES_URL = () => `${API_URL}/Auth/SignIn/WithCookies`;

//CHATS ALL
//get
export const GET_ALL_CHATS = (
  itemsToSkip: number = 0,
  itemsToTake: number = 5
) => `${API_URL}/Chats/All?itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`;

export const GET_CHAT_BY_ID = (
  ChatId: number,
  itemsToSkip: number = 0,
  itemsToTake: number = 5
) =>
  `${API_URL}/Chats/All/${ChatId}?itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`;

  //CHATS PRIVATE
  //get
export const GET_CHAT_ID_BY_USERNAME = (Username: string) =>
  `${API_URL}/Chats/Private/GetIdByUname/${Username}`;
//post
export const CREATE_PRIVATE = (RecipientUname: string) => `${API_URL}/Chats/Private/Create/${RecipientUname}`;
//CHATS GROUP
//post
export const ADD_CHAT_MEMBER = (ChatId: number, Username: string) =>
  `${API_URL}/Chats/Group/${ChatId}/AddMember/${Username}`;
export const CREATE_GROUP = () => `${API_URL}/Chats/Group/Create`;
export const MARK_CHAT_AS_READ = (ChatId: number) =>
  `${API_URL}/Chats/Group/${ChatId}/MarkAsRead`;
//patch
export const REMOVE_CHAT_MEMBER = (ChatId: number, Username: string) =>
  `${API_URL}/Chats/Group/${ChatId}/RmMember/${Username}`;
export const RENAME_GROUP_CHAT = (ChatId: number, NewName: string) =>
  `${API_URL}/Chats/Group/${ChatId}/Rename/${NewName}`;

//MESSAGES
//post
export const SEND_MESSAGE = (ChatId: number) =>
  `${API_URL}/Chats/${ChatId}/Messages/Send`;

export const ADD_LIKE = (ChatId: number, MessageId: number) =>
  `${API_URL}/Chats/${ChatId}/Messages/${MessageId}/AddLike`;
//delete
export const RM_LIKE = (ChatId: number, MessageId: number) =>
  `${API_URL}/Chats/${ChatId}/Messages/${MessageId}/RmLike`;
//patch
export const MARK_MSG_AS_DELETED = (ChatId: number, MessageId: number) =>
  `${API_URL}/Chats/${ChatId}/Messages/${MessageId}/MarkAsDeleted`;

//USERS
export const IS_TAKEN = (Type: string, Value: string) =>
  `${API_URL}/Users/IsTaken/${Type}/${Value}`;

export const GET_ALL_USERS = (
  itemsToSkip: number = 0,
  itemsToTake: number = 5
) =>
  `${API_URL}/Users?itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`;
export const GET_AVATAR = (FileName: string) => `${API_URL}/Users/Avatar/${FileName}`;
export const GET_USER = (UserName: string) => `${API_URL}/Users/${UserName}`;
export const SEARCH_USERS = (
  query: string = "",
  itemsToSkip: number = 0,
  itemsToTake: number = 5
) =>
  `${API_URL}/Users/Search?SearchPhrase=${query}&itemsToSkip=${itemsToSkip}&itemsToTake=${itemsToTake}`;

//post
export const UPLOAD_AVATAR = () => `${API_URL}/Users/UploadAvatar`;
export const UPDATE_BIO = () => `${API_URL}/Users/UpdateBio`;
