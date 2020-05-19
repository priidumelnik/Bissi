import { IBlogPost } from "./../domain/IBlogPost";
import { BaseApi } from "./base/BaseApi";

export abstract class BlogPostApi extends BaseApi<IBlogPost> {
    static baseUrl = "blogposts";
}
