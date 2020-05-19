<template>
    <div>
        <div v-if="authenticated">
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                        <b>Blogpost ID:</b>
                        {{blogpost.id}}
                    </p>
                    <p class="card-text">
                        <b>Blogpost title:</b>
                        {{blogpost.postTitle}}
                    </p>
                    <p class="card-text">
                        <b>Blogpost content:</b>
                        {{blogpost.postContent}}
                    </p>
                    <p class="card-text">
                        <b>Created at:</b>
                        {{blogpost.createdAt}}
                    </p>
                    <p class="card-text">
                        <b>User ID:</b>
                        {{blogpost.appUserId}}
                    </p>
                    <p class="card-text">
                        <b>Blogpost author name:</b>
                        {{blogpost.appUserName}}
                    </p>
                    <p class="card-text">
                        <b>Post type ID:</b>
                        {{blogpost.postTypeId}}
                    </p>
                    <p class="card-text">
                        <b>Post type name:</b>
                        {{blogpost.postTypeName}}
                    </p>
                    <button class="btn btn-primary" @click="goBack()">Go back</button>
                    <button class="btn btn-danger" @click="onClickDelete(blogpost.id)">Delete</button>
                </div>
            </div>
        </div>
        <div>
            <ErrorMessage v-if="errorMessage !== null" :info="errorMessage" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "../../router";
import { IBlogPost } from "@/domain/IBlogPost";
import { BlogPostApi } from "../../services/BlogPostApi";
import { IFetchResponse } from "../../types/IFetchResponse";
import ErrorMessage from "../../components/ErrorMessage.vue";

@Component({
    components: {
        ErrorMessage
    }
})
export default class BlogPostsDetails extends Vue {
    @Prop()
    private id!: string;

    private blogpost: IBlogPost | null = null;

    private errorMessage: string | null = null;

    get authenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    async singleItem(): Promise<IBlogPost | null> {
        if (store.getters.isAuthenticated && store.state.jwt) {
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
        return null;
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    async created(): Promise<void> {
        console.log("created");
        this.blogpost = await this.singleItem();
    }

    async onClickDelete(id: string): Promise<void> {
        if (store.state.jwt !== null && this.blogpost !== null) {
            const result = await BlogPostApi.delete(
                this.blogpost.id,
                store.state.jwt
            ).then((res: IFetchResponse<string>) => {
                if (res === undefined) {
                }
            });
            router.push("/blogposts");
        }
    }

    goBack(): void {
        router.push("/blogposts");
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
