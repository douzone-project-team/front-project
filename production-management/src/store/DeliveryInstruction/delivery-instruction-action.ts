import Fetcher from "../fetch-action";
import {AddDeliveryInstruction, DeleteDeliveryInstruction, UpdateDeliveryInstruction} from "../../object/DeliveryInstruction/delivery-instruction-object"

const fetcher = new Fetcher();

class DeliveryInstructionAction {
    private baseUrl: string = '/delivery-instructions';

    // 출고 지시 등록
    public addDeliveryInstruction(addDeliveryInstruction: AddDeliveryInstruction) {
        const URL = `${this.baseUrl}` + addDeliveryInstruction.deliveryNo;
        return fetcher.POST(URL, addDeliveryInstruction);
    }

    // 출고 지시 수정
    public updateDeliveryInstruction(updateDeliveryInstruction: UpdateDeliveryInstruction) {
        const URL = `${this.baseUrl}` + updateDeliveryInstruction.deliveryNo;
        return fetcher.PUT(URL, updateDeliveryInstruction);
    }

    // 출고 지시 삭제
    public deleteDeliveryInstruction(deleteDeliveryInstruction: DeleteDeliveryInstruction) {
        const URL = `${this.baseUrl}` + deleteDeliveryInstruction.deliveryNo;
        return fetcher.DELETE(URL);
    }
}

export default DeliveryInstructionAction;