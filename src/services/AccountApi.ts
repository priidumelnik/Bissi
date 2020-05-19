import { IPasswordConfirm } from "./../types/IPasswordConfirm";
import { ILoginDTO } from "./../types/ILoginDTO";
import Axios from "axios";
import { IPasswordChange } from "@/types/IPasswordChange";
import { IFetchResponse } from "@/types/IFetchResponse";

interface ILoginResponse {
    token: string;
    status: string;
}

const urlBase = "https://localhost:5001/api/v1.0/";

export abstract class AccountApi {
    private static axios = Axios.create({
        baseURL: urlBase,
        headers: {
            common: {
                "Content-Type": "application/json"
            }
        }
    });

    static async getJwt(loginDTO: ILoginDTO): Promise<IFetchResponse<string>> {
        const url = "account/login";
        try {
            const response = await this.axios.post<ILoginResponse>(
                url,
                loginDTO
            );
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data.token
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

    static async registerAndGetJwt(
        loginDto: ILoginDTO
    ): Promise<IFetchResponse<string>> {
        const url = "account/register";
        try {
            const response = await this.axios.post(url, loginDto);
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data.token
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

    static async changePassword(
        data: IPasswordChange,
        jwt: string
    ): Promise<IFetchResponse<string>> {
        const url = "account/changepassword";
        try {
            const response = await this.axios.put(url, data, {
                headers: { Authorization: "Bearer " + jwt }
            });
            console.log("RESPONSE:", response.data.status, response.status);
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data.token
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

    static async changeEmail(
        email: string,
        jwt: string
    ): Promise<IFetchResponse<string>> {
        const url = "account/changeemail";
        try {
            const response = await this.axios.put(
                url,
                { newEmail: email },
                {
                    headers: { Authorization: "Bearer " + jwt }
                }
            );
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data.token
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

    static async getEmail(jwt: string): Promise<IFetchResponse<string>> {
        const url = "account/userinfo";
        try {
            const response = await this.axios.get(url, {
                headers: { Authorization: "Bearer " + jwt }
            });
            console.log(response.status, "SOME STATUS");
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data.email
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

    static async deleteAccount(jwt: string): Promise<IFetchResponse<string>> {
        const url = "account/deleteuser";
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

    static async changeprofilePicture(
        data: FormData,
        jwt: string
    ): Promise<IFetchResponse<string>> {
        const url = "account/changepicture";
        try {
            const response = await Axios.post(urlBase + url, data, {
                headers: { Authorization: "Bearer " + jwt }
            });
            console.log(response);
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
