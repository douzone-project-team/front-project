import axios, { AxiosInstance } from 'axios';
import CookieManager from './CookieManager';  // Adjust the import path based on your project structure

// action 으로 위치를 옮김 제거 필요 : 적용 X
const cookieManager = new CookieManager();

const tokenAxios: AxiosInstance = axios.create({
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
});

export default tokenAxios;
