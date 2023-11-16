import Fetcher from '../fetch-action';
import {Employee, UpdateAuthEmployee} from "../../object/Auth/auth-object";

const fetcher = new Fetcher();

class AuthAction {

    createTokenHeader(token: string){
        return{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    }

    calculateRemainingTime(expirationTime: number){
        const currentTime = new Date().getTime();
        const ajdExpirationTime = new Date(expirationTime).getTime();
        const remainingDuration = ajdExpirationTime - currentTime;

        return remainingDuration;
    }

    loginToken(token: string){
        localStorage.setItem('token', token);
        return;
    }

    retrieveStoredToken(){
        const storedToken = localStorage.getItem('token');
        const storedExpirationDate = localStorage.getItem('expirationTime') || 0;

        const remainingTime = this.calculateRemainingTime(+ storedExpirationDate);

        // 임의로 토큰 유효시간 1000으로 제한
        if(remainingTime <= 1000){
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return null;
        }

        return{
            token: storedToken,
            duration: remainingTime
        }
    }

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