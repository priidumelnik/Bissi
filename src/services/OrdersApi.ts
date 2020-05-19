import { IOrder } from "./../domain/IOrder";
import Axios from "axios";
import { BaseApi } from './base/BaseApi';

export abstract class OrdersApi extends BaseApi<IOrder> {
    static baseUrl = "orders";
    // private static axios = Axios.create({
    //     baseURL: "https://localhost:5001/api/orders",
    //     headers: {
    //         common: {
    //             "Content-Type": "application/json"
    //         }
    //     }
    // });

    // static async getAll(jwt: string): Promise<IOrder[]> {
    //     const url = "orders";
    //     try {
    //         const response = await this.axios.get<IOrder[]>(url, {
    //             headers: { Authorization: "Bearer " + jwt }
    //         });
    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //         return [];
    //     } catch (error) {
    //         return [];
    //     }
    // }

    // static async getSingle(id: string, jwt: string): Promise<IOrder | null> {
    //     const url = "/" + id;
    //     try {
    //         const response = await this.axios.get<IOrder>(url, {
    //             headers: { Authorization: "Bearer " + jwt }
    //         });
    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //         return null;
    //     } catch (error) {
    //         return null;
    //     }
    // }

    // static async create(data: IOrder, jwt: string): Promise<number | string> {
    //     const url = "";
    //     try {
    //         const response = await this.axios.post(url, data, {
    //             headers: { Authorization: "Bearer " + jwt }
    //         });
    //         if (response.status === 201) {
    //             return response.status;
    //         }
    //         return response.status;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    // static async delete(id: string, jwt: string): Promise<number | string> {
    //     const url = "/" + id;
    //     try {
    //         const response = await this.axios.delete(url, {
    //             headers: { Authorization: "Bearer " + jwt }
    //         });
    //         if (response.status === 200) {
    //             return response.status;
    //         }
    //         return response.status;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    // static async put(id: string, data: IOrder, jwt: string): Promise<string> {
    //     const url = "/" + id;
    //     try {
    //         const response = await this.axios.put(url, data, {
    //             headers: { Authorization: "Bearer " + jwt }
    //         });
    //         if (response.status === 200) {
    //             return response.statusText;
    //         }
    //         return response.statusText;
    //     } catch (error) {
    //         return JSON.stringify(error);
    //     }
    // }
}
