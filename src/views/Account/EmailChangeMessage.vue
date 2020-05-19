<template>
    <div>
        <div class="alert alert-success alert-dismissible fade show">Email change was successful!</div>
        <p>
            <router-link to="/manage">Back to account management</router-link>
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ILoginDTO } from "@/types/ILoginDTO";
import store from "@/store";
import router from "../../router";

@Component
export default class EmailChangeMessage extends Vue {
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
