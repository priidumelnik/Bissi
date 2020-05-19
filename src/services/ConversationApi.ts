import { BaseApi } from "./base/BaseApi";
import { IConversation } from '@/domain/IConversation';

export abstract class ConversationApi extends BaseApi<IConversation> {
    static baseUrl = "conversations";
}
