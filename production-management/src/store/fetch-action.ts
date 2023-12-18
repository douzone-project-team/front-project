import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import CookieManager from '../common/CookieManager';

const BASE_URL = 'http://localhost:8080';

type ServerError = { data: string };

type Employee = {
  employeeNo: number,
  name: string,
  role: string
}

interface FetchData {
  method: string;
  url: string;
  data?: {};
  header?: {};
  param?: {};
}

class Fetcher {
  private getHeaders() {
    return {
      baseURL: 'http://localhost:8080/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      }
    };
  };

  private axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  private async fetch(fetchData: FetchData): Promise<AxiosResponse<any, any> | null> {
    const {method, url, data, param} = fetchData;

    try {
      const config = {
        ...this.getHeaders(),
        withCredentials: true,
        params: method === 'get' ? param : undefined
      };

      const response = await axios.request({method, url, data, ...config});
      return response;
    } catch (err) {
      const serverError = err as AxiosError<ServerError>;
      const errorMessage = serverError.response?.data;
      if (serverError && serverError.response) {
        const status = serverError.response.status;
        if (status === 401 && url != '/token/reissue') {
          await this.reissueToken();
          const originalRequest = serverError.config as InternalAxiosRequestConfig;
          originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
          return this.axiosInstance(originalRequest);
        } else if (status >= 500) {
          window.location.href = '/error';
        }
      }
      return Promise.reject(errorMessage);
    }
  }

  reissueToken = async (): Promise<void> => {
    const { employeeNo } = JSON.parse(localStorage.getItem('employee') as any) as Employee;
    try {
      const result = await this.POST('/token/reissue', {
        employeeNo: employeeNo
      });
      const accessToken = result?.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      window.location.href = '/login';
      return Promise.reject("토큰이 만료되었습니다. 로그인페이지로 이동합니다.");
    }
  }

  public GET(url: string, params?: object): Promise<AxiosResponse<any, any> | null> {
    return this.fetch({method: 'get', url: url, param: params});
  }

  public POST(url: string, data: {}): Promise<AxiosResponse<any, any> | null> {
    return this.fetch({method: 'post', url: url, data});
  }

  public PUT(url: string, data: {}): Promise<AxiosResponse<any, any> | null> {
    return this.fetch({method: 'put', url: url, data});
  }

  public DELETE(url: string): Promise<AxiosResponse<any, any> | null> {
    return this.fetch({method: 'delete', url: url});
  }
}

export default Fetcher;