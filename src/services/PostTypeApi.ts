import { BaseApi } from "./base/BaseApi";
import { IPostType } from "@/domain/IPostType";

export abstract class PostTypeApi extends BaseApi<IPostType> {
    static baseUrl = "posttypes";
}
