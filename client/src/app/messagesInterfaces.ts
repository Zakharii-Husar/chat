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
    chatName: string | null,
    participantsIds: string[],
    participantsUserNames: string[],
    messageToSend: IMessageToSend

}

export interface IGetChat{
    id: number | null,
    messages: IMessage[]
}
