import {
  AddProductInstruction,
  DeleteProductInstruction,
  UpdateProductInstruction
} from "../../object/ProductInstruction/product-instruction-object";
import Fetcher from "../fetch-action";

const fetcher = new Fetcher();

class ProductInstructionAction {
  private baseUrl: string = '/product-instruction';

  // 물품 지시 등록
  public addProductInstruction(addProductInstruction: AddProductInstruction) {
    const URL = `${this.baseUrl}/instruction/` + addProductInstruction.instructionNo;
    return fetcher.POST(URL, addProductInstruction);
  }

  // 물품 지시 수정
  public updateProductInstruction(updateProductInstruction: UpdateProductInstruction) {
    const URL = `${this.baseUrl}/instruction/` + updateProductInstruction.instructionNo + `/productNo/` + updateProductInstruction.productNo;
    return fetcher.PUT(URL, updateProductInstruction);
  }

  // 물품 지시 삭제
  public deleteProductInstruction(deleteProductInstruction: DeleteProductInstruction) {
    const URL = `${this.baseUrl}/instruction/` + deleteProductInstruction.instructionNo + `/productNo/` + deleteProductInstruction.productNo;
    return fetcher.DELETE(URL);
  }
  
}

export default ProductInstructionAction;