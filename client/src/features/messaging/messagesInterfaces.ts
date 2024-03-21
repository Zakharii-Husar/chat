export interface IChatMember {
  userName: string | null;
  memberId: string | null;
  isCreator: boolean
}

export interface IMessage {
  messageId: number;
  senderId: string;
  senderUserName: string;
  chatId: number;
  chatName: string | null;
  content: string;
  sentAt: string;
  likes: string[];
}

export interface IChats extends Array<IMessage> {}

export interface IMessageToSend {
  Content: string | null;
  RepliedTo: number | null;
}

export interface INewChat {
  chatName: string | null;
  members: IChatMember[];
  messageToSend: IMessageToSend;
}

export interface IExistingChat {
  chatId: number | null;
  chatName: string | null;
  members: IChatMember[];
  messages: IMessage[];
  paginationOffset: number;
  hasMoreMessages: boolean;
  isLoading: boolean;
}

export interface IChatsOverview {
  chats: IMessage[],
  paginationOffset: number,
  hasMore: boolean,
  isLoading: boolean
}
