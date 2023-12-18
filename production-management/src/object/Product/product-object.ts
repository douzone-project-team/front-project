import {CheckCustomerCode, DuplicateCustomerCodeResult} from "../Customer/customer-object";

export type Search = {
  productCode: string,
  productName: string,
  pageSize: number,
  page: number
}

export type ProductList = {
  productNo: number,
  productCode: string,
  productName: string,
  price: number,
  unit: number
}

export type ProductPage = {
  list: ProductList[],
  currentPage: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export type InsertProduct = {
  productCode: string,
  productName: string,
  price: number,
  standard: string,
  weight: number,
  unit: number
}
export type DuplicateProductCodeResult ={
  duplicateResult : boolean
}
export type Product = {
  productNo: number,
  productCode: string,
  productName: string,
  price: number,
  standard: string,
  weight: number,
  unit: number
}

export type CheckProductCode = {
  productCode : string
}
/* state type */
export type ProductsState = {
  search: Search,
  productPage: ProductPage,
  product: Product,
  setCheckProductCode :(productCode:string)=>void
  checkProductCode: CheckProductCode
  duplicateProductrCodeResult: DuplicateProductCodeResult
  duplicateCheck(productCode:string, handleResult: (result: boolean) => void):void
  duplicateCheckProductCode(productCode: string):void
  setProductCodeAndName(productCode: string, productName: string): void
  setPage(page: number): void
  getProductList(): void
  getProduct(productNo: number): void
  regiProducts(productCode: string, productName: string,standard: string, unit: number,  price: number, weight:number): void
  updateProduct(productNo: number, productCode: string, productName: string, standard: string,
                  unit: number, price: number, weight: number) : void;
  deleteProduct(productNo: number) : Promise<boolean>
  cleanProduct() : void
  getInitProduct() : void
}


/* path variables */
export type ProductPath = {
  productNo : number
}