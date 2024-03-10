export interface IMessage {
    messageId: number,
    senderId: string,
    userName: string,
    chatId: number,
    chatName: string | null,
    content: string,
    sentAt: string,
    likes: string[]

};

export interface IChats extends Array<IMessage> {}

export interface IMessageToSend {
    Content: string | null,
    RepliedTo: number | null
}


export interface IChat {
    chatId: number,
    messages: IMessage[],
    participantsIds: string[],
    messageToSend: IMessageToSend

}

