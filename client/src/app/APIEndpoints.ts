export const API_URL = "http://localhost:5190/chat-api";
export const WS_URL = "http://localhost:5190/Hub";

//AUTHORIZATION
export const LOGIN_URL = `${API_URL}/Auth/SignIn/WithPass`;
export const CHECK_COOKIES_URL = `${API_URL}/Auth/SignIn/WithCookies`;
export const REGISTER_URL = `${API_URL}/Auth/SignUp/WithPass`;

//USERS
export const GET_ALL_USERS = `${API_URL}/GetUsers`;
export const GET_USER_DETAILS = `${API_URL}/GetUserDetails`;
export const SEARCH_USERS = `${API_URL}/SearchUsers`;
export const GET_AVATAR = `${API_URL}/GetAvatar/`;
export const UPLOAD_AVATAR = `${API_URL}/UploadAvatar`;
export const EMAIL_AVAILABILITY_URL = `${API_URL}/CheckAvailability/IsEmailTaken`;
export const NICKNAME_AVAILABILITY_URL = `${API_URL}/CheckAvailability/IsUsernameTaken`;

//CHATS
export const GET_ALL_CHATS = `${API_URL}/GetChatsOverview`;
export const GET_CHAT_BY_ID = `${API_URL}/GetChatById`;
export const GET_CHAT_BY_USERNAME = `${API_URL}/GetChatIdByUsername?userName=`;
export const CREATE_GROUP_CHAT = `${API_URL}/CreateGroupChat`;
export const ADD_CHAT_MEMBER = `${API_URL}/AddChatMember`;
export const REMOVE_CHAT_MEMBER = `${API_URL}/RemoveChatMember`;
export const RENAME_GROUP_CHAT = `${API_URL}/RenameGroupChat`;

//MESSAGES
export const SEND_MESSAGE = `${API_URL}/SendMessage`;
export const LIKE_MESSAGE = `${API_URL}/LikeMessage`;


