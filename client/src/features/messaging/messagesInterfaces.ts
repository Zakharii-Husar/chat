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
  paginationOffset: number;
  hasMoreMessages: boolean;
  isLoading: boolean;
}

