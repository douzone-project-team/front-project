import Fetcher from "../fetch-action";
import {AddDeliveryObj, DeliverySearch, UpdateDelivery} from "../../object/Delivery/delivery-object";

const fetcher = new Fetcher();

class DeliveriesAction {
    private baseUrl: string = '/deliveries';

    // 출고 등록
    public addDelivery(addDeliveryObj: AddDeliveryObj) {
        const URL = `${this.baseUrl}`;
        return fetcher.POST(URL, addDeliveryObj);
    }

    // 출고 조회
    public getDelivery(deliveryNo: string) {
        const URL = `${this.baseUrl}/` + deliveryNo;
        return fetcher.GET(URL);
    }

    // 출고 조회 - 리스트
    public getDeliveryList(deliverySearch: DeliverySearch) {
        const URL = `${this.baseUrl}/list`;
        return fetcher.GET(URL, deliverySearch);
    }

    // 출고 수정
    public updateDelivery(upadateDelivery: UpdateDelivery) {
        const URL = `${this.baseUrl}/` + upadateDelivery.deliveryNo;
        return fetcher.PUT(URL, upadateDelivery);
    }

    //출고 상태 완료
    public updateDeliveryStatus(deliveryNo: string){
        const URL = `${this.baseUrl}/${deliveryNo}/complete`;
        return fetcher.PUT(URL, deliveryNo);
    }

    // 출고 삭제
    public deleteDelivery(deliveryNo: string) {
        const URL = `${this.baseUrl}/` + deliveryNo;
        return fetcher.DELETE(URL);
    }
}

export default DeliveriesAction;