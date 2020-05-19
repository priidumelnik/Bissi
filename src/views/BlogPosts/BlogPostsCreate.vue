<template>
    <div>
        <div v-if="authenticated">
            <h5>Create new blogpost</h5>
            <hr />
            <div class="row">
                <div class="col-md-4">
                    <ErrorMessage v-if="errorMessage !== null" :info="errorMessage" />
                    <form>
                        <div class="form-group">
                            <label class="control-label">Blogpost title</label>
                            <input
                                class="form-control"
                                type="text"
                                id="OrderNumber"
                                v-model="blogpost.postTitle"
                            />
                        </div>
                        <div class="form-group">
                            <label class="control-label">Blogpost content</label>
                            <input
                                class="form-control"
                                type="text"
                                id="OrderNumber"
                                v-model="blogpost.postContent"
                            />
                        </div>
                        <div class="form-group">
                            <label class="control-label">Blogpost type</label>
                            <select class="form-control" v-model="blogpost.postTypeId">
                                <option
                                    v-for="posttype in postTypes"
                                    :key="posttype.id"
                                    v-bind:value="posttype.id"
                                >{{posttype.postTypeName}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button
                                @click="sumbitValue()"
                                class="btn btn-primary"
                                type="submit"
                            >Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="!authenticated">
            <p>This action requires logging in!</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "../../router";
import { IBlogPost } from "../../domain/IBlogPost";
import { IPostType } from "../../domain/IPostType";
import { BlogPostApi } from "../../services/BlogPostApi";
import { PostTypeApi } from "../../services/PostTypeApi";
import ErrorMessage from "../../components/ErrorMessage.vue";
import { IFetchResponse } from "../../types/IFetchResponse";

@Component({
    components: {
        ErrorMessage
    }
})
export default class BlogPostsCreate extends Vue {
    private blogpost: IBlogPost = {
        id: "",
        postTitle: "",
        postContent: "",
        createdAt: "",
        appUserId: "",
        appUserName: "",
        postTypeId: "",
        postTypeName: ""
    };

    private postTypes: IPostType[] = [];

    private errorMessage: string | null = null;

    private authenticated = store.getters.isAuthenticated;

    async sumbitValue() {
        if (
            this.blogpost.postTitle.length > 0 &&
            store.state.jwt !== null &&
            this.blogpost.postContent.length > 0 &&
            this.blogpost.postTypeId.length > 0
        ) {
            const result = await BlogPostApi.create<IPostType>(
                this.blogpost,
                store.state.jwt
            ).then((res: IFetchResponse<string>) => {
                if (res.statusCode < 300) {
                    router.push("/blogposts");
                }
                this.errorMessage = res.errorMessage!;
            });
        } else {
            this.errorMessage = "Some fields do not meet requierments.";
        }
    }

    async getPostTypes(): Promise<void> {
        if (store.state.jwt !== null) {
            this.postTypes = await PostTypeApi.getAll<IPostType>(
                store.state.jwt
            ).then((data: IFetchResponse<IPostType[]>) => {
                if (data.data !== undefined) {
                    return data.data;
                }
                this.errorMessage = data.errorMessage!;
                return [];
            });
        }
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    created(): void {
        console.log("created");
        this.getPostTypes();
    }

    beforeMount(): void {
        console.log("beforeMount");
    }

    mounted(): void {
        console.log("mounted");
    }

    beforeUpdate(): void {
        console.log("beforeUpdate");
    }

    updated(): void {
        console.log("updated");
    }

    beforeDestroy(): void {
        console.log("beforeDestroy");
    }

    destroy(): void {
        console.log("destroy");
    }
}
</script>
