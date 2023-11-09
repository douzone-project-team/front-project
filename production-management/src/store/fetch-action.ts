import axios, {AxiosError, AxiosResponse} from 'axios';
import {Search} from "../object/Product/product-object";

type ServerError = { errorMessage: string };

interface FetchData {
  method: string;
  url: string;
  data?: {};
  header?: {};
  param?: {};
}

class Fetcher {
  private async fetch(fetchData: FetchData): Promise<AxiosResponse<any, any> | null> {
    const {method, url, data, header, param} = fetchData;

    try {
      const response: AxiosResponse<any, any> | false =
          (method === 'get' && (await axios.get(url, {
            params: param
          }))) ||
          (method === 'post' && (await axios.post(url, data, header))) ||
          (method === 'put' && (await axios.put(url, data, header))) ||
          (method === 'delete' && (await axios.delete(url, header)));

      if (!response) {
        alert('false!');
        return null;
      }

      return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.log(serverError.response.data);
          alert('failed!');
          return null;
        }
      }

      console.log(err);
      alert('failed!');
      return null;
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
