import Fetcher from '../fetch-action';
import {UpdateEmployee, EmployeeSearch} from "../../object/Employee/employee-object";
import AuthAction from "../Auth/auth-action";

const fetcher = new Fetcher();
const authAction = new AuthAction;

class EmployeeAction {



    private baseUrl: string = '/employees';

    /* 로그인 */
    public login(id: string, password: string) {
        const URL = `${this.baseUrl}/login`;
        const loginObject = {id, password};
        return fetcher.POST(URL, loginObject);
    }

    /* 로그아웃 */
    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    }

    /* Employee 상세 조회 */
    public getEmployee(employeeNo: number) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        return fetcher.GET(URL);
    }

    /* Employee 상세 조회 (본인) */
    public getMe(token: string) {
        const URL = `${this.baseUrl}/me`;
        return fetcher.GET(URL, authAction.createTokenHeader(token))
    }

    /* EmployeeList 조회 */
    public getEmployeeList(object: EmployeeSearch) {
        const URL = `${this.baseUrl}/list`;
        return fetcher.GET(URL, object);
    }

    /* Employee 수정 */
    public updateEmployee(employeeNo: number, object: UpdateEmployee) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        return fetcher.PUT(URL, object);
    }

    /* 이미지 추가 */
    public addImage(employeeNo: number, image: File) {
        const URL = `${this.baseUrl}/${employeeNo}/image`;
        const imageObject = new FormData();
        imageObject.append('image', image);

        return fetcher.POST(URL, imageObject);
    }

    /* 이미지 수정 */
    public updateImage(employeeNo: number, image: File) {
        const URL = `${this.baseUrl}/${employeeNo}/image`;
        const updateImageObject = { image };

        return fetcher.PUT(URL, updateImageObject);
    }

    /* 이미지 삭제 */
    public deleteImage(employeeNo: number) {
        const URL = `${this.baseUrl}/${employeeNo}/image`;
        return fetcher.DELETE(URL);
    }

}

export default EmployeeAction;