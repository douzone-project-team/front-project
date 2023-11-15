import { Cookies } from 'react-cookie';

class CookieManager{
    private cookies = new Cookies;

    constructor(){
        this.cookies = new Cookies();
    }

    /** Key, Value를 받아 Cookie 생성 후 저장
     * @param {string} name
     * @param {string} value
     */
    public setCookie(name: string, value: string){
        this.cookies.set(name, value, { maxAge: 60 * 60 * 3, path: '/' });
    }

    /** Key를 받아 Value를 반환
     * @param {string} name
     * @returns {string}
     */
    public getCookie(name: string){
        return this.cookies.get(name);
    }

    /** Key를 받아 쿠키를 삭제
     * @param {string} name
     */
    public removeCookie(name: string){
        this.cookies.remove(name);
    }
}

export default CookieManager;