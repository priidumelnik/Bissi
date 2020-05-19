<template>
    <div>
        <ErrorMessage v-if="registerWasOk === false" :info="errorMessage" />
        <h5>Register</h5>
        <div class="row">
            <div class="col-md-4">
                <form>
                    <hr />
                    <div class="form-group">
                        <label>Email</label>
                        <input class="form-control" type="email" v-model="registerInfo.email" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" type="password" v-model="registerInfo.password" />
                    </div>
                    <div class="form-group">
                        <label>Confirm password</label>
                        <input
                            class="form-control"
                            type="password"
                            v-model="registerInfo.passwordConfirm"
                        />
                    </div>
                    <button
                        @click="onClickRegister()"
                        class="btn btn-primary"
                        type="submit"
                    >Register</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IRegisterDTO } from "@/types/IRegisterDTO";
import router from "../../router";
import store from "@/store";
import ErrorMessage from "../../components/ErrorMessage.vue";

@Component({
    components: {
        ErrorMessage
    }
})
export default class Register extends Vue {
    private registerInfo: IRegisterDTO = {
        email: "",
        password: "",
        passwordConfirm: ""
    };

    private errorMessage = "";

    private registerWasOk: boolean | null = null;

    onClickRegister(): void {
        if (
            this.registerInfo.email.length > 0 &&
            this.registerInfo.password.length >= 8 &&
            this.registerInfo.password === this.registerInfo.passwordConfirm
        ) {
            store
                .dispatch("registerUser", this.registerInfo)
                .then((registred: boolean) => {
                    if (registred) {
                        this.registerWasOk = true;
                        router.push("/");
                    } else {
                        this.registerWasOk = false;
                        this.errorMessage = "Bad register attempt!";
                    }
                });
        } else {
            this.registerWasOk = false;
            this.errorMessage = "Bad register attempt!";
        }
    }

    beforeCreate(): void {
        console.log("beforeCreate index");
    }

    created(): void {
        console.log("created index");
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
