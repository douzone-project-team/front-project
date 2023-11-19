import Fetcher from '../fetch-action'
import {Search, UpdateCustomer} from "../../object/Customer/customer-object";
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

    public updateCustomer(customerNo : number, updateCustomer : UpdateCustomer){
        const URL = `${this.baseUrl}/${customerNo}`;
        console.log(updateCustomer);
        return fetcher.PUT(URL, updateCustomer);
    }

    public deleteCustomer(customerNo : number){
        const URL = `${this.baseUrl}/${customerNo}`;
        return fetcher.DELETE(URL);
    }
}

export default CustomerAction;
