export interface IUserDetails {
  id: string | null;
  userName: string | null;
  email: string | null;
  fullName: string | null;
  avatarName: string | null;
  bio: string | null;
  lastVisit: Date | null;
}

export interface IUsersModel {
  allUsers: IUserDetails[];
  filteredUsers: IUserDetails[];
  searchedUser: string | null;
}

export interface IChatMember {
  userName: string | null;
  memberId: string | null;
  isCreator: boolean
}

export interface IMessage {
  messageId: number;
  senderId: string;
  senderUserName: string;
  senderAvatarName: string | null;
  chatId: number;
  chatName: string | null;
  content: string;
  sentAt: string;
  likes: string[];
}

export interface IChats extends Array<IMessage> {}


export interface ICurrentChat {
  chatId: number | null;
  chatName: string | null;
  members: IChatMember[];
  messages: IMessage[];
  hasMoreMessages: boolean;
  isLoading: boolean;
}

export interface IChatsOverview {
  chats: IMessage[],
  hasMore: boolean,
  isLoading: boolean
}

export interface IChatMember {
  userName: string | null;
  memberId: string | null;
  isCreator: boolean;
}
export interface ICreateChat {
  name: string | null;
  candidates: IChatMember[];
}

export interface ILoginState {
  usernameOrEmail: string | null,
  password: string | null
}

export interface IregisterState {
  email: string | null;
  fullName: string | null;
  nickName: string | null;
  password: string | null;
  confirm: string | null;
}

export interface IMessageToSend {
  Content: string | null;
  RepliedTo: number | null;
}