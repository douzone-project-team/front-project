import Fetcher from "../fetch-action";
import {AddDeliveryInstruction, DeleteDeliveryInstruction, UpdateDeliveryInstruction} from "../../object/DeliveryInstruction/delivery-instruction-object"

const fetcher = new Fetcher();

class DeliveryInstructionAction {
    private baseUrl: string = '/delivery-instructions';

    // 출고 지시 등록
    public addDeliveryInstruction(deliveryNo: string, addDeliveryInstruction: AddDeliveryInstruction) {
        const URL = `${this.baseUrl}/${deliveryNo}`;
        console.log(addDeliveryInstruction);
        return fetcher.POST(URL, addDeliveryInstruction);
    }

    // 출고 지시 수정
    public updateDeliveryInstruction(updateDeliveryInstruction: UpdateDeliveryInstruction) {
        const URL = `${this.baseUrl}/` + updateDeliveryInstruction.deliveryNo;
        const updateDeliveryInstructionObj = {
            instructionNo: updateDeliveryInstruction.instructionNo,
            productNo: updateDeliveryInstruction.productNo,
            amount: updateDeliveryInstruction.amount
        }
        return fetcher.PUT(URL, updateDeliveryInstructionObj);
    }

    // 출고 지시 삭제
    public deleteDeliveryInstruction(deleteDeliveryInstruction: DeleteDeliveryInstruction) {
        const URL =
            `${this.baseUrl}/${deleteDeliveryInstruction.deliveryNo}/${deleteDeliveryInstruction.instructionNo}/${deleteDeliveryInstruction.productNo}`;
        return fetcher.DELETE(URL);
    }
}

export default DeliveryInstructionAction;