import Fetcher from '../fetch-action'
import {Search} from "../../object/Customer/customer-object";
import {InsertCustomer} from "../../object/Customer/customer-object";

const fetcher = new Fetcher();

class CustomerAction{
    private baseUrl : string = '/customers';

    public regiCustomers(object : InsertCustomer){
        return fetcher.POST(this.baseUrl, object);
    }

    public getCustomer(customerNo : number){
        const URL = `${this.baseUrl}/`+ customerNo;
        return fetcher.GET(URL);
    }

    public getCustomerList(object : Search){
        const URL = `${this.baseUrl}/list`;
        return fetcher.GET(URL, object);
    }

    public updateCustomer(customerNo : number, customerName : string, customerTel : string){
        const URL = `${this.baseUrl}/${customerNo}`;
        const updateCusObject = {customerName, customerTel};
        return fetcher.PUT(URL, updateCusObject);
    }

    public deleteCustomer(customerNo : number){
        const URL = `${this.baseUrl}/${customerNo}`;
        return fetcher.DELETE(URL);
    }
}

export default CustomerAction;
