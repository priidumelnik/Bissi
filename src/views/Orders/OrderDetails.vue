<template>
    <div v-if="authenticated">
        <ErrorMessage v-if="errorMessage !== null" :info="errorMessage" />
        <h4>Order details</h4>
        <p>
            <b>Order ID:</b>
            {{order.id}}
        </p>
        <p>
            <b>Made by:</b>
            {{order.appUserName}}
        </p>
        <p>
            <b>Created at:</b>
            {{order.createdAt}}
        </p>
        <p>
            <b>User ID:</b>
            {{order.appUserId}}
        </p>
        <p>
            <b>Order number:</b>
            {{order.orderNumber}}
        </p>
        <button class="btn btn-primary" @click="goBack()">Go back</button>
        <button class="btn btn-danger" @click="onClickDelete(order.id)">Delete</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IOrder } from "@/domain/IOrder";
import store from "@/store";
import { OrdersApi } from "@/services/OrdersApi";
import router from "../../router";
import { IFetchResponse } from "@/types/IFetchResponse";
import ErrorMessage from "../../components/ErrorMessage.vue";

@Component({
    components: {
        ErrorMessage
    }
})
export default class OrderDetails extends Vue {
    @Prop()
    private id!: string;

    private order: IOrder | null = null;

    private errorMessage: string | null = null;

    get authenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    async singleOrder(): Promise<IOrder | null> {
        if (store.getters.isAuthenticated && store.state.jwt) {
            const result = await OrdersApi.getSingle<IOrder>(
                this.id,
                store.state.jwt
            ).then((res: IFetchResponse<IOrder>) => {
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

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    async created(): Promise<void> {
        console.log("created");
        this.order = await this.singleOrder();
        if (this.order === null) {
            this.errorMessage =
                "Unable to finish request, because it does not exist or unauthenticated request!";
        }
    }

    onClickDelete(id: string): void {
        store.dispatch("deleteOrder", id);
        router.push("/orders/");
    }

    goBack(): void {
        router.push("/orders/");
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
