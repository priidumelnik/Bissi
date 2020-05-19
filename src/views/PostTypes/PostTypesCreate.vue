<template>
    <div>
        <div v-if="authenticated">
            <div class="alert">{{this.errorMessage}}</div>
            <h1>Create new post type</h1>
            <hr />
            <div class="row">
                <div class="col-md-4">
                    <form>
                        <div class="form-group">
                            <label class="control-label">Type name</label>
                            <input
                                class="form-control"
                                type="text"
                                id="OrderNumber"
                                v-model="postType.postTypeName"
                            />
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
import { PostTypeApi } from "../../services/PostTypeApi";
import { IPostType } from "../../domain/IPostType";

@Component
export default class PostTypesCreate extends Vue {
    private postType: IPostType = {
        id: "",
        postTypeName: "",
        createdAt: ""
    };

    private errorMessage: string | null = null;

    private authenticated = store.getters.isAuthenticated;

    async sumbitValue() {
        if (this.postType.postTypeName.length > 0 && store.state.jwt !== null) {
            const result = await PostTypeApi.create<IPostType>(
                this.postType,
                store.state.jwt
            );
            console.log("RESULT OF CREATION: ", result);
            router.push("/posttypes");
        }
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    created(): void {
        console.log("created");
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
