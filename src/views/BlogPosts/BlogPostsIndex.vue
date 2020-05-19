<template>
    <div>
        <h1>Blogposts</h1>
        <div v-if="authenticated">
            <router-link to="/blogposts/create">Create new</router-link>
            <ErrorMessage v-if="errorMessage !== null" :info="errorMessage" />
            <ul class="list-group">
                <li
                    v-for="blogpost in blogposts"
                    :key="blogpost.id"
                    class="list-group-item list-group-item-action flex-column align-items-start"
                >
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">
                                <b>Blogpost title:</b>
                                {{blogpost.postTitle}}
                            </p>
                            <p class="card-text">
                                <b>Blogpost content:</b>
                                {{blogpost.postContent}}
                            </p>
                            <button
                                @click="detailsOnClick(blogpost)"
                                type="button"
                                class="btn btn-secondary"
                            >Details</button>
                            <button
                                @click="editOnClick(blogpost)"
                                type="button"
                                class="btn btn-primary"
                            >Edit</button>
                            <button
                                @click="deleteOnClick(blogpost)"
                                type="button"
                                class="btn btn-danger"
                            >Delete</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div
            class="alert alert-danger"
            v-if="!authenticated"
        >To see this page you must be logged in!</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IBlogPost } from "../../domain/IBlogPost";
import { BlogPostApi } from "../../services/BlogPostApi";
import store from "@/store";
import router from "@/router";
import ErrorMessage from "../../components/ErrorMessage.vue";
import { IFetchResponse } from "@/types/IFetchResponse";

@Component({
    components: {
        ErrorMessage
    }
})
export default class BlogPostsIndex extends Vue {
    private authenticated = store.getters.isAuthenticated;

    private blogposts = [] as IBlogPost[];

    private errorMessage: string | null = null;

    async getItems(): Promise<void> {
        if (store.state.jwt !== null) {
            this.blogposts = await BlogPostApi.getAll<IBlogPost>(
                store.state.jwt
            ).then((res: IFetchResponse<IBlogPost[]>) => {
                if (res.data !== undefined) {
                    return res.data;
                }
                this.errorMessage = res.errorMessage!;
                return [];
            });
            console.log("TULEMUSED: ", this.blogposts);
        }
    }

    async deleteOnClick(blogpost: IBlogPost): Promise<void> {
        if (store.state.jwt !== null) {
            const result = await BlogPostApi.delete(
                blogpost.id,
                store.state.jwt
            ).then((res: IFetchResponse<string>) => {
                if (res.statusCode < 300) {
                    this.getItems();
                }
                this.errorMessage = res.errorMessage!;
            });
        }
    }

    editOnClick(blogpost: IBlogPost): void {
        router.push("/blogposts/edit/" + blogpost.id);
    }

    detailsOnClick(blogpost: IBlogPost): void {
        router.push("/blogposts/details/" + blogpost.id);
    }

    beforeCreate(): void {
        console.log("beforeCreate index");
    }

    created(): void {
        console.log("created BLOGPOSTS INDEX");
        this.getItems();
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
