<template>
    <div>
        <div v-if="!loginWasOk && loginWasOk !== null">
            <ErrorMessage :info="errorMessage" />
        </div>
        <h5>Log in</h5>

        <div class="row">
            <div class="col-md-4">
                <section>
                    <form>
                        <h4>Use a local account to log in.</h4>
                        <hr />
                        <div class="form-group">
                            <label>User name</label>
                            <input
                                class="form-control"
                                type="email"
                                id="username"
                                v-model="loginInfo.email"
                            />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input
                                class="form-control"
                                type="password"
                                id="password"
                                v-model="loginInfo.password"
                            />
                        </div>
                        <div class="form-group">
                            <button
                                class="btn btn-primary"
                                @click="loginClick($event)"
                                type="submit"
                            >Log in</button>
                        </div>
                    </form>
                </section>
            </div>
            <div class="col-md-6 col-md-offset-2"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ILoginDTO } from "@/types/ILoginDTO";
import store from "@/store";
import router from "../../router";
import ErrorMessage from "../../components/ErrorMessage.vue";

@Component({
    components: {
        ErrorMessage
    }
})
export default class AccountLogin extends Vue {
    private loginInfo: ILoginDTO = {
        email: "elu2@elu.com",
        password: "Kala123-"
    };

    private loginWasOk: boolean | null = null;

    private errorMessage = "dadsa";

    loginClick(event: Event): void {
        if (
            this.loginInfo.email.length > 0 &&
            this.loginInfo.password.length > 0
        ) {
            store
                .dispatch("authenticateUser", this.loginInfo)
                .then((isLoggedIn: boolean) => {
                    if (isLoggedIn) {
                        this.loginWasOk = true;
                        router.push("/");
                    } else {
                        this.loginWasOk = false;
                        this.errorMessage = "Bad login attempt!";
                    }
                });
        } else {
            this.errorMessage = "Bad login attempt!";
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
