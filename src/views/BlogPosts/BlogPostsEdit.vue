<template>
    <div v-if="authenticated">
        <template v-if="blogpost !== null">
            <h1>Edit post type</h1>
            <hr />
            <div class="row">
                <div class="col-md-4">
                    <form>
                        <ErrorMessage v-if="errorMessage !== null" :info="errorMessage" />
                        <div class="form-group">
                            <label class="control-label">Blogpost title</label>
                            <input
                                class="form-control"
                                type="text"
                                maxlength="64"
                                v-model="blogpost.postTitle"
                            />
                        </div>
                        <div class="form-group">
                            <label class="control-label">Blogpost content</label>
                            <input
                                class="form-control"
                                type="text"
                                maxlength="64"
                                v-model="blogpost.postContent"
                            />
                        </div>
                        <div class="form-group">
                            <input
                                type="button"
                                value="Save"
                                class="btn btn-primary"
                                @click="saveOnClick()"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </template>
        <ErrorMessage v-if="blogpost === null" :info="errorMessage" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";
import { IBlogPost } from "../../domain/IBlogPost";
import { BlogPostApi } from "../../services/BlogPostApi";
import ErrorMessage from "../../components/ErrorMessage.vue";
import { IFetchResponse } from "@/types/IFetchResponse";

@Component({
    components: {
        ErrorMessage
    }
})
export default class BlogPostsEdit extends Vue {
    @Prop()
    private id!: string;

    private blogpost: IBlogPost | null = null;

    private errorMessage: string | null = null;

    get authenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    async singleItem(): Promise<IBlogPost | null> {
        if (this.authenticated && store.state.jwt) {
            const result = await BlogPostApi.getSingle<IBlogPost>(
                this.id,
                store.state.jwt
            ).then((res: IFetchResponse<IBlogPost>) => {
                if (res.data !== undefined) {
                    return res.data;
                }
                this.errorMessage = res.errorMessage!;
                return null;
            });
            return result;
        }
        this.errorMessage = "You must be logged in to access this page!";
        return null;
    }

    async saveOnClick(): Promise<void> {
        if (
            store.getters.isAuthenticated &&
            store.state.jwt &&
            this.blogpost !== null
        ) {
            const result = await BlogPostApi.put<IBlogPost>(
                this.id,
                this.blogpost,
                store.state.jwt
            );
            router.push("/blogposts");
        }
    }

    beforeCreate(): void {
        console.log("beforeCreate EDIT");
    }

    async created(): Promise<void> {
        console.log("created POSTTYPE EDIT");
        this.blogpost = await this.singleItem();
        if (this.blogpost === null) {
            this.errorMessage =
                "Unable to finish request, because it does not exist or unauthenticated request!";
        }
    }

    beforeMount(): void {
        console.log("beforeMount EDIT");
    }

    mounted(): void {
        console.log("mounted EDIT");
        // this.order = await this.singleOrder();
    }

    beforeUpdate(): void {
        console.log("beforeUpdate");
    }

    updated(): void {
        console.log("updated");
    }

    beforeDestroy(): void {
        console.log("beforeDestroy EDIT");
    }

    destroy(): void {
        console.log("destroy");
    }
}
</script>
