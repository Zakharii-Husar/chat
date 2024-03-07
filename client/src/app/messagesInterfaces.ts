export interface IMessage {
    "id": string
    "senderId": string
    "recieverId": string
    "content": string
    "time": string
    "isRead": boolean
    "replyToMsg": null | number
};

export interface IChats {
    chats: IMessage[][],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null;

}
export interface IMessageToSend {
    ReceiverId: string | null,
    Content: string | null,
    RepliedTo: number | null
}


export interface IChat {
    chatId: number,
    chat: IMessage[],
    messageToSend: IMessageToSend

}

