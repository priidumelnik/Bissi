import { IBase } from './base/IBase';

export interface IBlogPost extends IBase{
    //id: string;
    postTitle: string;
    postContent: string;
    createdAt: string;
    appUserId: string;
    appUserName: string;
    postTypeId: string;
    postTypeName: string;
}
