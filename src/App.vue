<template>
    <div id="app">
        <header>
            <nav
                class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
            >
                <div class="container">
                    <!-- <a class="navbar-brand" href="/">WebApp</a> -->
                    <router-link to="/" class="navbar-brand">WebApp</router-link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target=".navbar-collapse"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                        <Identity />

                        <ul class="navbar-nav flex-grow-1">
                            <li class="nav-item">
                                <router-link to="/" class="nav-link text-dark">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/orders/" class="nav-link text-dark">Orders</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/messages" class="nav-link text-dark">Messages</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <div class="container-fluid">
            <main role="main">
                <router-view />
                <!-- <div class="footer">
                    <div class="container">
                        <span class="text-muted">Footer</span>
                    </div>
                </div>-->
            </main>
            <div>
                <br />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Identity from "./components/Identity.vue";
import store from "./store";

@Component({
    components: {
        Identity
    }
})
export default class App extends Vue {
    beforeCreate(): void {
        console.log("beforeCreate");
    }

    created(): void {
        console.log("created APP");
        if (store.state.jwt === null && localStorage.getItem("jwt") !== null) {
            store.commit("setJwt", localStorage.getItem("jwt"));
        }
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
