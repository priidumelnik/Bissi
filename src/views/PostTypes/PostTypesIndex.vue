<template>
    <div>
        <h1>Post types</h1>
        <div v-if="authenticated">
            <router-link to="/posttypes/create">Create new</router-link>
            <ul>
                <li v-for="posttype in posttypes" :key="posttype.id">
                    <p>
                        <b>Post type:</b>
                        {{posttype.postTypeName}}
                        <button
                            @click="detailsOnClick(posttype)"
                            type="button"
                            class="btn btn-secondary"
                        >Details</button>
                        <button
                            @click="editOnClick(posttype)"
                            type="button"
                            class="btn btn-primary"
                        >Edit</button>
                        <button
                            @click="deleteOnClick(posttype)"
                            type="button"
                            class="btn btn-danger"
                        >Delete</button>
                    </p>
                </li>
            </ul>
        </div>
        <div v-if="!authenticated">To see this page you must be logged in!</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IPostType } from "../../domain/IPostType";
import store from "@/store";
import router from "@/router";
import { PostTypeApi } from "../../services/PostTypeApi";

@Component
export default class PostTypesIndex extends Vue {
    private authenticated = store.getters.isAuthenticated;

    private posttypes = [] as IPostType[];

    async getPosttypes(): Promise<void> {
        if (store.state.jwt !== null) {
            this.posttypes = await PostTypeApi.getAll<IPostType>(store.state.jwt).then(res => {
                return res.data!;
            });
        }
    }

    async deleteOnClick(posttype: IPostType): Promise<void> {
        if (store.state.jwt !== null) {
            const result = await PostTypeApi.delete(posttype.id, store.state.jwt);
            this.getPosttypes();
        }
    }

    editOnClick(posttype: IPostType): void {
        router.push("/posttypes/edit/" + posttype.id);
    }

    detailsOnClick(posttype: IPostType): void {
        router.push("/posttypes/details/" + posttype.id);
    }

    beforeCreate(): void {
        console.log("beforeCreate index");
    }

    created(): void {
        console.log("created index");
        this.getPosttypes();
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
        // this.getPosttypes();
    }

    beforeDestroy(): void {
        console.log("beforeDestroy");
    }

    destroy(): void {
        console.log("destroy");
    }
}
</script>
