import Fetcher from '../fetch-action';
import {Search} from "../../object/Product/product-object";

const fetcher = new Fetcher();


class ProductAction {

  private baseUrl: string = '/products';

  // 품목 등록
  public regiProducts(designation: string, productCode: string, standard: string, unit: number) {
    const URL = `${this.baseUrl}/products`;
    const regiProObject = {designation, productCode, standard, unit};
    return fetcher.POST(URL, regiProObject);
  }

  // 품목 조회
  public getProduct(productNo: number) {
    const URL = `${this.baseUrl}/product/`+productNo;
    return fetcher.GET(URL);
  }

  // 품목 조회
  public getProductList(object: Search) {
    const URL = `${this.baseUrl}/list`;
    return fetcher.GET(URL, object);
  }

  // 품목 수정
  public updateProduct(productNo: number, designation: string, productCode: string, standard: string, unit: number) {
    const URL = `${this.baseUrl}/${productNo}`;
    const updateProObject = {designation, productCode, standard, unit};
    return fetcher.PUT(URL, updateProObject);
  }

  // 품목 삭제
  public deleteProduct(productNo: number) {
    const URL = `${this.baseUrl}/${productNo}`;
    return fetcher.DELETE(URL);
  }
}

export default ProductAction;
