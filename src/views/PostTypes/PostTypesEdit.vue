<template>
    <div v-if="authenticated">
        <template v-if="posttype !== null">
            <h1>Edit post type</h1>
            <hr />
            <div class="row">
                <div class="col-md-4">
                    <form>
                        <div class="form-group">
                            <label class="control-label">Post type name</label>
                            <input
                                class="form-control"
                                type="text"
                                maxlength="64"
                                v-model="posttype.postTypeName"
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
        <template v-if="posttype === null">
            <p>{{errorMessage}}</p>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "@/router";
import { IPostType } from "../../domain/IPostType";
import { PostTypeApi } from "../../services/PostTypeApi";
import { IFetchResponse } from "@/types/IFetchResponse";

@Component
export default class PostTypesEdit extends Vue {
    @Prop()
    private id!: string;

    private posttype: IPostType | null = null;

    private errorMessage = "";

    get authenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    async singleItem(): Promise<IPostType | null> {
        if (this.authenticated && store.state.jwt) {
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

    async saveOnClick(): Promise<void> {
        if (
            store.getters.isAuthenticated &&
            store.state.jwt &&
            this.posttype !== null
        ) {
            const result = await PostTypeApi.put<IPostType>(
                this.id,
                this.posttype,
                store.state.jwt
            );
            router.push("/posttypes");
        }
    }

    beforeCreate(): void {
        console.log("beforeCreate EDIT");
    }

    async created(): Promise<void> {
        console.log("created POSTTYPE EDIT");
        this.posttype = await this.singleItem();
        if (this.posttype === null) {
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
