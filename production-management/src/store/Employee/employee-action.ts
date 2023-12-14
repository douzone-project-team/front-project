import Fetcher from '../fetch-action';
import {UpdateEmployee} from "../../object/Employee/employee-object";

const fetcher = new Fetcher();

class EmployeeAction {
    private baseUrl: string = '/employees';

    public login(id: string, password: string) {
        const URL = `${this.baseUrl}/login`;
        const loginObject = {id, password};
        return fetcher.POST(URL, loginObject);
    }

    public logout() {
        localStorage.removeItem('accessToken');
    }

    public getMe() {
        const URL = `${this.baseUrl}/me`;
        return fetcher.GET(URL);
    }

    public getEmployee(employeeNo: number) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        return fetcher.GET(URL);
    }

    public updateEmployee(employeeNo: number, object: UpdateEmployee) {
        const URL = `${this.baseUrl}/${employeeNo}`;
        return fetcher.PUT(URL, object);
    }

    public addImage(employeeNo: number, image: File) {
        const URL = `${this.baseUrl}/${employeeNo}/image`;
        const imageObject = new FormData();
        imageObject.append('file', image);

        return fetcher.POST(URL, imageObject);
    }

    public updateImage(employeeNo: number, image: File) {
        const URL = `${this.baseUrl}/${employeeNo}/image`;
        const updateImageObject = new FormData();
        updateImageObject.append('file', image);

        return fetcher.PUT(URL, updateImageObject);
    }

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
    public getMessages() {
        const URL = `${this.baseUrl}/messages/getMessages`;
        return fetcher.GET(URL);
    }

    public sendMessage(sendId: number, targetId: number, message: string){
        const URL = `${this.baseUrl}/messages/${sendId}/${targetId}`;
        return fetcher.POST(URL, {
            message:message
        });
    }

    public checkMessage(messageNo: number){
        const URL = `${this.baseUrl}/messages/${messageNo}`
        return fetcher.PUT(URL,messageNo);
    }

}

export default EmployeeAction;