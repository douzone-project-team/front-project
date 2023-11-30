import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import CookieManager from '../common/CookieManager';

// TODO : custom axios 위치 변경 : 적용 O
const cookieManager = new CookieManager();

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
    const {method, url, data, param} = fetchData;
    console.log(url);
    console.log(localStorage.getItem('accessToken'));
    try {
      const response: AxiosResponse<any, any> | false =
          (method === 'get' && (await axios.get(url, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                },
                params: param
              })
          )) ||
          (method === 'post' && (await axios.post(url, data,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
          }))) ||
          (method === 'put' && (await axios.put(url, data,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
          }))) ||
          (method === 'delete' && (await axios.delete(url, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
          })));

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
          const status = serverError.response.status;
          if (url === '/employees/login' && status !== 200) {
            // TODO : 로그인 실패할경우 login 페이지를 리다이렉트하게 해두었는데 더 좋은 방법으로 수정이 필요함. : 적용 X
            alert('아이디 또는 비밀번호가 틀렸습니다');
            window.location.href = '/login';
          } else if (status === 401) {
            // TODO : refresh token 으로 access token 을 재발급 받고 전의 요청을 재전송해야함. : 적용 O
            if (cookieManager.getCookie('refreshToken')) {
              this.POST('/token/reissue', {
                refreshToken: cookieManager.getCookie('refreshToken'),
                employeeNo: localStorage.getItem('employeeNo'),
                // TODO : employeeNo 를 어디서 얻어 와서 넣을 것인가. 만료이후 요청이기 때문에 서버로 부터 받아올 수 없음, 그렇기 때문에 로컬 스토리지에 저장해서 가지고 오는 방법이 좋아보임
                // 그러면 로그인 성공이후 로컬 스토리지에 refresh 토큰 을 추가할때 서버로 부터 /me 를 통해 얻어온 employeeNo를 로컬 스토리지에 저장. : 적용 O
              })
                  .then((result) => {
                    const accessToken = result?.data.accessToken;
                    localStorage.setItem('accessToken', accessToken);
                    // TODO : 다시 전의 요청을 실행하도록 해야함. : 적용 X
                  })
            }
            alert('로그인 이후 접근 가능합니다.');
            window.location.href = '/login';
          } else if (status >= 400 && status < 500) { // TODO : 4xx 요청 에러는 not-found 로 보냄 : 적용 O
            alert(serverError);
            // TODO : 문제점이 잘하다가 데이터 조회했는데 없을 경우도 /not-found로 보내짐 다르게 처리할 필요가 있음 : 적용 X
            window.location.href = '/not-found';
          } else { // TODO : 나머지 오류의 경우 3XX , 5XX 인데 3XX는 사용자 않았고, 5XX 는 서버 에러 : 적용 O
            alert(serverError);
            window.location.href = '/error';
          }
        }
      }
      console.log(err);
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