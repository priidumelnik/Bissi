<template>
    <div v-if="authenticated">
        <template v-if="order !== null">
            <h1>Edit order</h1>
            <hr />
            <div class="row">
                <div class="col-md-4">
                    <form>
                        <div class="form-group">
                            <label class="control-label">Ordernumber</label>
                            <input
                                class="form-control"
                                type="text"
                                maxlength="64"
                                v-model="order.orderNumber"
                            />
                        </div>
                        <div class="form-group">
                            <input
                                type="submit"
                                value="Save"
                                class="btn btn-primary"
                                @click="saveOnClick()"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </template>
        <template v-if="order === null">
            <ErrorMessage v-if="errorMessage !== null" :info="errorMessage" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IOrder } from "../../domain/IOrder";
import store from "@/store";
import router from "@/router";
import { OrdersApi } from "../../services/OrdersApi";
import ErrorMessage from "../../components/ErrorMessage.vue";

@Component({
    components: {
        ErrorMessage
    }
})
export default class OrderEdit extends Vue {
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
            ).then(res => {
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

    async saveOnClick(): Promise<void> {
        if (
            store.getters.isAuthenticated &&
            store.state.jwt &&
            this.order !== null
        ) {
            const result = await OrdersApi.put<IOrder>(
                this.id,
                this.order,
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
        console.log("beforeCreate ORDER EDIT");
    }

    async created(): Promise<void> {
        console.log("created ORDER EDIT");
        this.order = await this.singleOrder();
        if (this.order === null) {
            this.errorMessage =
                "Unable to finish request, because it does not exist or unauthenticated request!";
        }
    }

    beforeMount(): void {
        console.log("beforeMount EDIT");
    }

    mounted(): void {
        console.log("mounted EDIT");
        // this.order = await this.singleOrder();
    }

    beforeUpdate(): void {
        console.log("beforeUpdate");
    }

    updated(): void {
        console.log("updated");
    }

    beforeDestroy(): void {
        console.log("beforeDestroy EDIT");
    }

    destroy(): void {
        console.log("destroy");
    }
}
</script>
