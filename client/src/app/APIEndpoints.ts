export const API_URL = "http://localhost:5190/chat-api";
export const LOGIN_URL = `${API_URL}/AuthWithPass`;
export const CHECK_COOKIES_URL = `${API_URL}/AuthWithCookies`;
export const REGISTER_URL = `${API_URL}/RegisterWithPass`;
export const EMAIL_AVAILABILITY_URL = `${API_URL}/CheckAvailability/IsEmailTaken`;
export const NICKNAME_AVAILABILITY_URL = `${API_URL}/CheckAvailability/IsUsernameTaken`;

export const GET_ALL_USERS = `${API_URL}/GetUsers`;
export const SEARCH_USERS = `${API_URL}/SearchUsers`;

export const GET_ALL_CHATS = `${API_URL}/GetChats`;
export const GET_CHAT_ID = `${API_URL}/GetChatIdOrCreate`;
export const GET_CHAT_BY_ID = `${API_URL}/GetChatById`;
export const SEND_MESSAGE = `${API_URL}/SendMessage`;

