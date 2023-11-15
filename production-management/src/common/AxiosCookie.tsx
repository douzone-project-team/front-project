import axios, { AxiosInstance } from 'axios';
import CookieManager from './CookieManager';  // Adjust the import path based on your project structure

const cookieManager = new CookieManager();

const AxiosCookie: AxiosInstance = axios.create({
    headers: {
        accessToken: cookieManager.getCookie('accessToken'),
    },
});

export default AxiosCookie;
