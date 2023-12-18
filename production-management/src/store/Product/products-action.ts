import Fetcher from '../fetch-action';
import {CheckProductCode, Search} from "../../object/Product/product-object";
import {CheckCustomerCode} from "../../object/Customer/customer-object";

const fetcher = new Fetcher();


class ProductAction {

  private baseUrl: string = '/products';

  // 품목 등록
  public regiProducts(productCode: string, productName: string, standard: string, unit: number,weight:number,price:number) {
    const URL = `${this.baseUrl}`;
    const regiProObject = {productCode, productName, standard, unit, weight, price};
    console.log(`${this.baseUrl}`);
    console.log(regiProObject);
    return fetcher.POST(URL, regiProObject);
  }
  public duplicateCheckProductCode(productCode:string){
    const URL = `${this.baseUrl}/code/${productCode}`;
    return fetcher.GET(URL)
  }

  // 품목 조회
  public getProduct(productNo: number) {
    const URL = `${this.baseUrl}/${productNo}`;
    return fetcher.GET(URL);
  }

  // 품목 조회
  public getProductList(object: Search) {
    const URL = `${this.baseUrl}/list`;
    return fetcher.GET(URL, object);
  }

  // 품목 수정
  public updateProduct(productNo: number, productCode: string, productName: string, standard: string, unit: number, weight:number, price:number) {
    const URL = `${this.baseUrl}/${productNo}`;
    const updateProObject = {productCode, productName, standard, unit,price,weight};
    return fetcher.PUT(URL, updateProObject);
  }

  // 품목 삭제
  public deleteProduct(productNo: number) {
    const URL = `${this.baseUrl}/${productNo}`;
    return fetcher.DELETE(URL);
  }
}

export default ProductAction;
