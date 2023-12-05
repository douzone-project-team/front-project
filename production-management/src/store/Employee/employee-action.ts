import Fetcher from '../fetch-action';
import {Search, UpdateEmployee} from "../../object/Employee/employee-object";

const fetcher = new Fetcher();

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
        localStorage.removeItem('accessToken');
    }

    /* Employee 상세 조회 (본인) */
    // TODO : token 은 header 로 보내기 때문에 body 제거 : 적용 O
    public getMe() {
        const URL = `${this.baseUrl}/me`;
        return fetcher.GET(URL);
    }

    public getEmployee(employeeNo: number) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        return fetcher.GET(URL);
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
        imageObject.append('file', image);

        return fetcher.POST(URL, imageObject);
    }

    /* 이미지 수정 */
    public updateImage(employeeNo: number, image: File) {
        const URL = `${this.baseUrl}/${employeeNo}/image`;
        const updateImageObject = new FormData();
        updateImageObject.append('file', image);

        return fetcher.PUT(URL, updateImageObject);
    }

    /* 이미지 삭제 */
    public deleteImage(employeeNo: number) {
        const URL = `${this.baseUrl}/${employeeNo}/image`;
        return fetcher.DELETE(URL);
    }

    public myInstruction() {
        const URL = '/instructions/myInstruction'
        return fetcher.GET(URL);
    }

    public myDelivery() {
        const URL = '/deliveries/myDelivery'
        return fetcher.GET(URL);
    }

}

export default EmployeeAction;