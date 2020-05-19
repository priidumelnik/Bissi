<template>
    <div>
        <div v-if="authenticated">
            <h1>Create new order</h1>
            <hr />
            <div class="row">
                <div class="col-md-4">
                    <form>
                        <div class="form-group">
                            <label class="control-label">Order number</label>
                            <input
                                class="form-control"
                                type="text"
                                id="OrderNumber"
                                v-model="orderNumber"
                            />
                        </div>

                        <div class="form-group">
                            <button @click="sumbitValue()" class="btn btn-primary">Create</button>
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
import { OrdersApi } from "../../services/OrdersApi";
import router from "../../router";
import { IOrder } from "../../domain/IOrder";

@Component
export default class OrderDetails extends Vue {
    private orderNumber = "";

    private authenticated = store.getters.isAuthenticated;

    private errorMessage: string | null = null;

    async sumbitValue() {
        if (this.orderNumber.length > 0 && store.state.jwt !== null) {
            const createOrders = await OrdersApi.create<IOrder>(
                {
                    id: "",
                    appUserName: "",
                    orderNumber: this.orderNumber,
                    createdAt: "",
                    appUserId: ""
                },
                store.state.jwt
            ).then(res => {
                if (res.statusCode < 300) {
                    router.push("/orders/");
                }
                this.errorMessage = res.errorMessage!;
            });
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
