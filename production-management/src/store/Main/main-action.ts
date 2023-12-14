import Fetcher from "../fetch-action";
import {Employee} from "../../object/Main/main-object";
import {AxiosResponse} from "axios";

const fetcher = new Fetcher();

class MainAction {
  private baseUrl: string = '/main-page';

  public getCurrentpage(){
      const URL = `${this.baseUrl}`;
      return fetcher.GET(URL)
          .then(data => {
              return data;
          });
  };

  public getEmployee(employeeNo: number, setEmployee: (emp: Employee) => void) {
        const URL = `/employees/${employeeNo}`;
        return fetcher.GET(URL)
            .then((res) => {
                if (res) {
                    const {data} = res
                    setEmployee(data as Employee)
                }
            });
  }

  public getBarGraph(term: string) {
    const URL = `${this.baseUrl}/bar-graph/` + term;
    return fetcher.GET(URL)
        .then(data => {
          return data;
        });
  }

    public getCircleGraph(term: string) {
        const URL = `${this.baseUrl}/circle-graph/` + term;
        return fetcher.GET(URL)
            .then(data => {
                return data;
            });
    }
}

export default MainAction;
