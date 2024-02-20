import { MessageModel } from "./chatsSlice";

export function groupMessagesByChats(messages: MessageModel[]) {
    //const allChats: MessageModel[][] = [];

    //messages.forEach((message: MessageModel) => {

    //    const existingPairIndex = allChats.findIndex((group: MessageModel[]) => {
    //        const makeChatId = (sender: string, reciever: string) => {
    //            return [sender, reciever].sort().join("_");
    //        }

    //        let matches = false;
    //        group.forEach(msg => {
    //            if (makeChatId(msg.sender, msg.reciever) === makeChatId(message.sender, message.reciever))
    //                matches = true;
    //        })
    //        return matches;
    //    }
    //    );


    //    if (existingPairIndex !== -1) {
    //        allChats[existingPairIndex].push(message);
    //    } else {
    //        allChats.push([message]);
    //    }
    //});

    //return allChats;
}