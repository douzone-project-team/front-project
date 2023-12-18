import Fetcher from '../fetch-action';
import {Employee, Search, UpdateAuthEmployee} from "../../object/Auth/auth-object";

const fetcher = new Fetcher();

class AuthAction {

    private baseUrl: string = '/auth/employees';
    private baseUrl2: string = '/employees';

    /* Employee 등록 */
    public addEmployee(object: Employee) {
        const URL = `${this.baseUrl}/register`;
        return fetcher.POST(URL, object);
    }

    /* Employee 삭제 */
    public deleteEmployee(employeeNo: number) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        return fetcher.DELETE(URL);
    }

    /* Employee 수정 */
    public updateEmployee(updateAuthEmployee: UpdateAuthEmployee) {
        const URL = `${this.baseUrl}/${updateAuthEmployee.employeeNo}`;
        return fetcher.PUT(URL, updateAuthEmployee);
    }

    /* Employee No 중복 체크 */
    public employeeNoCheck(employeeNo: number) {
        const URL = `${this.baseUrl}/no/check`;
        return fetcher.GET(URL,{employeeNo: employeeNo});
    }

    /* Employee Id 중복 체크 */
    public idCheck(id: string) {
        const URL = `${this.baseUrl}/id/check`;
        return fetcher.GET(URL,{id: id});
    }

    /* Employee 상세 조회 */
    public getEmployee(employeeNo: number) {
        const URL = `${this.baseUrl2}/${employeeNo}`;
        return fetcher.GET(URL);
    }

    /* EmployeeList 조회 */
    public getEmployeeList(object: Search) {
        const URL = `${this.baseUrl2}/list`;
        return fetcher.GET(URL, object);
    }

}

export default AuthAction;