import Fetcher from "../fetch-action";
import {AddDeliveryObj, DeliverySearch, UpdateDelivery} from "../../object/Delivery/delivery-object";

const fetcher = new Fetcher();

class DeliveriesAction {
    private baseUrl: string = '/deliveries';

    public addDelivery(addDeliveryObj: AddDeliveryObj) {
        const URL = `${this.baseUrl}`;
        return fetcher.POST(URL, addDeliveryObj);
    }

    public getDelivery(deliveryNo: string) {
        const URL = `${this.baseUrl}/` + deliveryNo;
        return fetcher.GET(URL);
    }

    public getDeliveryList(deliverySearch: DeliverySearch) {
        const URL = `${this.baseUrl}/list`;
        return fetcher.GET(URL, deliverySearch);
    }

    public updateDelivery(upadateDelivery: UpdateDelivery) {
        const URL = `${this.baseUrl}/` + upadateDelivery.deliveryNo;
        return fetcher.PUT(URL, upadateDelivery);
    }

    public updateDeliveryStatus(deliveryNo: string){
        const URL = `${this.baseUrl}/${deliveryNo}/complete`;
        return fetcher.PUT(URL, deliveryNo);
    }

    public deleteDelivery(deliveryNo: string) {
        const URL = `${this.baseUrl}/` + deliveryNo;
        return fetcher.DELETE(URL);
    }

    public getRemainAmount(instructionNo: string, productNo: number) {
        const URL = `/product-instruction/${instructionNo}/${productNo}`;
        return fetcher.GET(URL);
    }
}

export default DeliveriesAction;