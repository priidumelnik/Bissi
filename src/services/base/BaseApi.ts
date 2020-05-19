import { IFetchResponse } from "./../../types/IFetchResponse";
import { IBase } from "./../../domain/base/IBase";
import Axios from "axios";

export abstract class BaseApi<T extends IBase> {
    static baseUrl = "";

    private static axios = Axios.create({
        baseURL: "https://localhost:5001/api/v1.0/",
        headers: {
            common: {
                "Content-Type": "application/json"
            }
        }
    });

    static async getAll<T>(jwt: string): Promise<IFetchResponse<T[]>> {
        const url = this.baseUrl;
        try {
            const response = await this.axios.get<T[]>(url, {
                headers: { Authorization: "Bearer " + jwt }
            });
            console.log("GET ALL RESULT: ", response);
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            };
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error)
            };
        }
    }

    static async getSingle<T>(
        id: string,
        jwt: string
    ): Promise<IFetchResponse<T>> {
        const url = this.baseUrl + "/" + id;
        try {
            const response = await this.axios.get<T>(url, {
                headers: { Authorization: "Bearer " + jwt }
            });
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            };
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error)
            };
        }
    }

    static async create<T>(
        data: T,
        jwt: string
    ): Promise<IFetchResponse<string>> {
        const url = this.baseUrl;
        try {
            const response = await this.axios.post(url, data, {
                headers: { Authorization: "Bearer " + jwt }
            });
            console.log("CREATED ITEM, STATUS IS:", response.status);
            if (response.status === 201) {
                return {
                    statusCode: response.status
                    // no data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            };
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error)
            };
        }
    }

    static async delete<T>(
        id: string,
        jwt: string
    ): Promise<IFetchResponse<string>> {
        const url = this.baseUrl + "/" + id;
        try {
            const response = await this.axios.delete(url, {
                headers: { Authorization: "Bearer " + jwt }
            });
            if (response.status === 200) {
                return {
                    statusCode: response.status
                    // no data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            };
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error)
            };
        }
    }

    static async put<T>(
        id: string,
        data: T,
        jwt: string
    ): Promise<IFetchResponse<string>> {
        const url = this.baseUrl + "/" + id;
        try {
            const response = await this.axios.put(url, data, {
                headers: { Authorization: "Bearer " + jwt }
            });
            if (response.status === 200) {
                return {
                    statusCode: response.status
                    // no data
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText
            };
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error)
            };
        }
    }
}
