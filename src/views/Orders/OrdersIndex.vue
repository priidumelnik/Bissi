<template>
    <div>
        <h1>Orders</h1>
        <div v-if="authenticated">
            <!-- <router-link :to="url">Details</router-link> -->
            <router-link to="/orders/create">Create new</router-link>
            <ul>
                <li v-for="order in orders" :key="order.id">
                    <p>
                        <b>User:</b>
                        {{order.appUserName}} |
                        <b>Order number:</b>
                        {{order.orderNumber}}
                        <button
                            @click="detailsOnClick(order)"
                            type="button"
                            class="btn btn-secondary"
                        >Details</button>
                        <button
                            @click="editOnClick(order)"
                            type="button"
                            class="btn btn-primary"
                        >Edit</button>
                        <button
                            @click="deleteOnClick(order)"
                            type="button"
                            class="btn btn-danger"
                        >Delete</button>
                    </p>
                </li>
            </ul>
        </div>
        <div v-if="!authenticated">In order to see this page you must be logged in!</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IOrder } from "../../domain/IOrder";
import store from "@/store";
import router from "@/router";

@Component
export default class OrdersIndex extends Vue {
    private authenticated = store.getters.isAuthenticated;

    get orders(): IOrder[] {
        return store.state.orders;
    }

    deleteOnClick(order: IOrder): void {
        store.dispatch("deleteOrder", order.id);
    }

    editOnClick(order: IOrder): void {
        router.push("/orders/edit/" + order.id);
    }

    detailsOnClick(order: IOrder): void {
        router.push("/orders/details/" + order.id);
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
        store.dispatch("getOrders");
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
