<template>
    <div>
        <div v-if="isAuthenticated" class="row">
            <div class="col-md-5">
                <div v-if="errorMessage !== null">
                    <ErrorMessage :info="errorMessage" v-if="errorMessage !== null" />
                </div>
                <form>
                    <h5>Change profile picture</h5>
                    <div class="form-group">
                        <label>Current picture</label>
                        <br />
                        <img v-bind:src="img" class="rounded" style="height:200px;align:left" />
                    </div>
                    <div class="form-group">
                        <input type="file" @change="addPic($event)" />
                    </div>
                    <button type="submit" class="btn btn-primary" @click="changeProfilePic()">Change</button>
                </form>
                <hr />
                <form>
                    <h5>Change email</h5>
                    <div class="form-group">
                        <label>Current email</label>
                        <input class="form-control" disabled v-model="oldEmail" />
                    </div>
                    <div class="form-group">
                        <label>New email</label>
                        <input class="form-control" v-model="emailChange" />
                    </div>
                    <button type="submit" class="btn btn-primary" @click="changeEmail()">Change</button>
                </form>
                <hr />
                <form>
                    <h5>Change password</h5>
                    <div class="form-group">
                        <label>Old password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="passwordChange.oldPassword"
                        />
                    </div>
                    <div class="form-group">
                        <label>New password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="passwordChange.newPassword"
                        />
                    </div>
                    <div class="form-group">
                        <label>Confirm new password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="passwordChange.newPasswordConfirm"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary" @click="changePassword()">Confirm</button>
                </form>
                <hr />
                <form>
                    <h5>Delete account</h5>
                    <div class="form-group">
                        <label>Enter your password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="deleteConfirm.password"
                        />
                    </div>
                    <div class="form-group">
                        <label>Confirm your password</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="deleteConfirm.passwordConfirm"
                        />
                    </div>
                    <button class="btn btn-danger" @click="deleteAccount()">Delete</button>
                </form>
            </div>
        </div>
        <div
            v-if="!isAuthenticated && !accountDeleted"
            class="alert alert-danger alert-dismissible fade show"
        >To see this page, you must be logged in.</div>
        <ErrorMessage v-if="accountDeleted" info="Account has been deleted" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store";
import { IPasswordChange } from "../../types/IPasswordChange";
import { IPasswordConfirm } from "../../types/IPasswordConfirm";
import { AccountApi } from "../../services/AccountApi";
import router from "../../router";
import ErrorMessage from "../../components/ErrorMessage.vue";

@Component({
    components: {
        ErrorMessage
    }
})
export default class ManageAccount extends Vue {
    private passwordChange: IPasswordChange = {
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    };

    private img =
        "https://localhost:5001/pictures/2adb3440-9414-4385-84f0-08d7f11701e6.jpg";

    private deleteConfirm: IPasswordConfirm = {
        password: "",
        passwordConfirm: ""
    };

    private picture: any = null;

    private emailChange = "";

    private oldEmail = "";

    private errorMessage: string | null = null;

    private accountDeleted = false;

    get isAuthenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    changeEmail(): void {
        if (this.isAuthenticated && store.state.jwt !== null) {
            if (this.oldEmail !== this.emailChange) {
                store
                    .dispatch("changeEmail", this.emailChange)
                    .then((wasSuccess: boolean) => {
                        if (wasSuccess) {
                            router.push("/emailchanged");
                        } else {
                            this.errorMessage =
                                "Email change was not successful.";
                        }
                    });
            } else {
                this.errorMessage = "You must change your email.";
            }
        }
    }

    async getOldEmail(): Promise<void> {
        if (this.isAuthenticated && store.state.jwt !== null) {
            const result = await AccountApi.getEmail(store.state.jwt);
            if (result.data !== undefined) {
                this.oldEmail = result.data;
            }
        }
    }

    changePassword(): void {
        if (store.state.jwt !== null) {
            if (
                this.passwordChange.newPassword ===
                    this.passwordChange.newPasswordConfirm &&
                this.passwordChange.newPassword !==
                    this.passwordChange.oldPassword &&
                this.passwordChange.newPassword.length >= 8
            ) {
                console.log("PASSWORD CHANGE");
                store
                    .dispatch("changePassword", this.passwordChange)
                    .then((success: boolean) => {
                        if (success) {
                            router.push("/login");
                        } else {
                            this.errorMessage =
                                "Password change was not successful.";
                        }
                    });
            } else {
                this.errorMessage =
                    "You have entered incorrect current password or new password does not match with confirmation.";
            }
        }
    }

    deleteAccount(): void {
        if (store.state.jwt !== null) {
            if (
                this.deleteConfirm.password ===
                    this.deleteConfirm.passwordConfirm &&
                this.deleteConfirm.password.length >= 8
            ) {
                store.dispatch("deleteAccount").then((success: boolean) => {
                    if (success) {
                        this.accountDeleted = true;
                    } else {
                        this.errorMessage =
                            "Account deletion was not successful";
                    }
                });
            } else {
                this.errorMessage =
                    "Password and password confirmation do not match.";
            }
        }
    }

    addPic(event: any): void {
        if (event !== null && event.target !== null) {
            this.picture = event.target.files[0];
            console.log(this.picture, "STUFFF");
        }
    }

    changeProfilePic(): void {
        if (store.state.jwt !== null && this.picture !== null) {
            const data: FormData = new FormData();
            data.append("file", this.picture);
            AccountApi.changeprofilePicture(data, store.state.jwt);
        }
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    created(): void {
        console.log("created");
        this.getOldEmail();
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
