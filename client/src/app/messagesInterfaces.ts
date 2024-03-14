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
  participantsIds: string[];
  participantsUserNames: string[];
  messageToSend: IMessageToSend;
}

export interface IExistingChat {
  id: number | null;
  chatName: string | null;
  members: [
    {
      userName: string | null;
      memberId: string | null;
    }
  ];
  messages: IMessage[];
}
