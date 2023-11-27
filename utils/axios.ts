import axios, { AxiosResponse, Method } from 'axios';

const SERVER_DEPOLY_URL = 'https://dev-server.homfo.co.kr/api';
const SERVER_PRODUCTION_URL = 'https://prod-server.homfo.co.kr/api'


export const fetchFromApi = async (method: Method | undefined, url: string, data?: any, token?: string): Promise<AxiosResponse> => {
    const headers: any = {};
    if (token) {
        // Add the JWT access token to the 'Authorization' header
        headers.Authorization = token;
    }
    return axios({
        method,
        url: SERVER_PRODUCTION_URL  + url,
        data,
        headers,
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });
};
