import Fetcher from '../fetch-action';
import {Employee, UpdateAuthEmployee} from "../../object/Auth/auth-object";

const fetcher = new Fetcher();

class AuthAction {

    private baseUrl: string = '/auth/employees';

    /* Employee 등록 */
    public regiEmployee(object: Employee) {
        const URL = `${this.baseUrl}/register`;
        const regiEmpObject = {object};
        return fetcher.POST(URL, regiEmpObject);
    }

    /* Employee 삭제 */
    public deleteEmployee(employeeNo: number) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        return fetcher.DELETE(URL);
    }

    /* Employee 수정 */
    public updateEmployee(employeeNo: number, object: UpdateAuthEmployee) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        const updateEmpObject = {object};
        return fetcher.PUT(URL, updateEmpObject);
    }

    /* Employee No 중복 체크 */
    public employeeNoCheck(employeeNo: number) {
        const URL = `${this.baseUrl}/no/check`;
        const response = fetcher.GET(URL, {
            params : { employeeNo }
        });
        return response;
    }

    /* Employee Id 중복 체크 */
    public idCheck(id: string) {
        const URL = `${this.baseUrl}/id/check`;
        const response = fetcher.GET(URL, {
            params : { id }
        });
        return response;
    }

}

export default AuthAction;