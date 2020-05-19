<template>
<div>
    <div v-if="authenticated">
        <h4>Post type details</h4>
        <p>
            <b>Post type ID:</b>
            {{posttype.id}}
        </p>
        <p>
            <b>Made by:</b>
            {{posttype.postTypeName}}
        </p>
        <p>
            <b>Created at:</b>
            {{posttype.createdAt}}
        </p>
        <button class="btn btn-primary" @click="goBack()">Go back</button>
        <button class="btn btn-danger" @click="onClickDelete(posttype.id)">Delete</button>
    </div>
    <div>{{errorMessage}}</div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "../../router";
import { IPostType } from "../../domain/IPostType";
import { PostTypeApi } from "../../services/PostTypeApi";
import { IFetchResponse } from '@/types/IFetchResponse';

@Component
export default class PostTypesDetails extends Vue {
    @Prop()
    private id!: string;

    private posttype: IPostType | null = null;

    private errorMessage = "";

    get authenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    async singleItem(): Promise<IPostType | null> {
        if (store.getters.isAuthenticated && store.state.jwt) {
            const result = await PostTypeApi.getSingle<IPostType>(
                this.id,
                store.state.jwt
            ).then((res: IFetchResponse<IPostType>) => {
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
        this.posttype = await this.singleItem();
        if (this.posttype === null) {
            this.errorMessage =
                "Unable to finish request, because it does not exist or unauthenticated request!";
        }
    }

    async onClickDelete(id: string): Promise<void> {
        if (store.state.jwt !== null && this.posttype !== null) {
            const result = await PostTypeApi.delete(
                this.posttype.id,
                store.state.jwt
            );
            router.push("/posttypes");
        }
    }

    goBack(): void {
        router.push("/posttypes");
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
