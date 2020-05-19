import { IPasswordChange } from "./../types/IPasswordChange";
import { IRegisterDTO } from "./../types/IRegisterDTO";
import { IOrder } from "./../domain/IOrder";
import { ILoginDTO } from "./../types/ILoginDTO";
import Vue from "vue";
import Vuex from "vuex";
import { AccountApi } from "@/services/AccountApi";
import { OrdersApi } from "@/services/OrdersApi";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        jwt: null as string | null,
        orders: [] as IOrder[]
    },
    mutations: {
        setJwt(state, jwt: string | null) {
            state.jwt = jwt;
            if (jwt) {
                localStorage.setItem("jwt", jwt);
            }
        },
        setOrders(state, orders: IOrder[]) {
            state.orders = orders;
        }
    },
    getters: {
        isAuthenticated(context): boolean {
            return context.jwt !== null;
        }
    },
    actions: {
        clearJwt(context): void {
            context.commit("setJwt", null);
            localStorage.removeItem("jwt");
        },
        async authenticateUser(context, loginDto: ILoginDTO): Promise<boolean> {
            const result = await AccountApi.getJwt(loginDto);
            // console.log("TESTETETETETETEETTE", result.data);
            context.commit("setJwt", result.data);
            return result.data !== undefined;
        },
        async changeEmail(context, newEmail: string): Promise<boolean> {
            if (context.state.jwt !== null) {
                const result = await AccountApi.changeEmail(
                    newEmail,
                    context.state.jwt
                );
                context.commit("setJwt", result.data);
                return true;
            }
            return false;
        },
        async changePassword(context, data: IPasswordChange): Promise<boolean> {
            if (context.state.jwt !== null) {
                const result = await AccountApi.changePassword(
                    data,
                    context.state.jwt
                );
                context.commit("setJwt", null);
                return true;
            }
            return false;
        },
        async deleteAccount(context): Promise<boolean> {
            if (context.state.jwt !== null) {
                const result = await AccountApi.deleteAccount(
                    context.state.jwt
                );
                context.commit("setJwt", null);
                return true;
            }
            return false;
        },
        async registerUser(
            context,
            registerDto: IRegisterDTO
        ): Promise<boolean> {
            const loginDto: ILoginDTO = {
                email: registerDto.email,
                password: registerDto.password
            };
            const result = await AccountApi.registerAndGetJwt(loginDto);
            context.commit("setJwt", result.data);
            return result.data !== undefined;
        },
        async getOrders(context): Promise<void> {
            if (context.state.jwt === null) {
                context.commit("setJwt", localStorage.getItem("jwt"));
            }
            if (context.state.jwt !== null) {
                const orders = await OrdersApi.getAll(context.state.jwt);
                await console.log(orders);
                context.commit("setOrders", orders.data);
            }
        },
        async deleteOrder(context, id: string): Promise<void> {
            if (context.getters.isAuthenticated && context.state.jwt) {
                await OrdersApi.delete(id, context.state.jwt);
                await context.dispatch("getOrders");
            }
        }
    },
    modules: {}
});
