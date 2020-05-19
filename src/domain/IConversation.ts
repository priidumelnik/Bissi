import { IBase } from "./base/IBase";

export interface IConversation extends IBase {
    // id: string;
    conversationName: string;
    starterId: string;
    starterName: string;
    recipientId: string;
    recipientName: string;
}
