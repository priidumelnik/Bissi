<template>
    <ul class="navbar-nav">
        <template v-if="!isAuthenticated">
            <li class="nav-item">
                <router-link class="nav-link text-dark" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link text-dark" to="/login">Login</router-link>
            </li>
        </template>
        <template v-if="isAuthenticated">
            <li class="nav-item">
                <router-link class="nav-link text-dark" to="/manage">Manage {{userEmail}}</router-link>
            </li>
            <li class="nav-item">
                <a @click="logoutClicked" class="nav-link text-dark" href>Logout</a>
                <!-- <router-link class="nav-link text-dark" to="/logout">Logout</router-link> -->
            </li>
        </template>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import router from "../router";
import JwtDecode from "jwt-decode";
// const jwtDecode = require("jwt-decode");

@Component
export default class Identity extends Vue {
    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    get userEmail(): string {
        if (store.state.jwt !== null) {
            const decoded = JwtDecode(store.state.jwt) as Record<
                string,
                string
            >;
            return decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ];
        }
        return "null";
    }

    logoutClicked(): void {
        store.dispatch("clearJwt");
        router.push("/");
    }
}
</script>
