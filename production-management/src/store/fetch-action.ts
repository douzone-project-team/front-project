import axios, {AxiosError, AxiosResponse} from 'axios';
import CookieManager from '../common/CookieManager';
import Swal from 'sweetalert2';

// TODO : custom axios 위치 변경 : 적용 O
const cookieManager = new CookieManager();

type ServerError = { data: string };

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
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    };
  }

  private async fetch(fetchData: FetchData): Promise<AxiosResponse<any, any> | null> {
    const {method, url, data, param} = fetchData;

    try {
      const config = {
        ...this.getHeaders(),
        params: method === 'get' ? param : undefined
      };

      const response = await axios.request({method, url, data, ...config});

      return response;
    } catch (err) {
      const serverError = err as AxiosError<ServerError>;
      const errorMessage = serverError.response?.data;
      if (serverError && serverError.response) {
        const status = serverError.response.status;
        if (status === 401 && cookieManager.getCookie('refreshToken')) {
          this.reissueToken();
        } else if (status >= 500) {
          window.location.href = '/error';
        }
      }
      return Promise.reject(errorMessage);
    }
  }

  reissueToken = () => {
    this.POST('http://localhostL:8080/token/reissue', {
      refreshToken: cookieManager.getCookie('refreshToken'),
      employeeNo: localStorage.getItem('employeeNo')
    }).then((result) => {
      const accessToken = result?.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
    })
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