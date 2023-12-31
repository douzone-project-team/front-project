import React, {Component} from "react";
import ProductAction from "./products-action"
import {ProductsState} from "../../object/Product/product-object";
import {
    initialCheckProductCode, initialDuplicateProductCodeResult,
    initialProduct,
    initialProductPageState,
    initialSearchState
} from "../../state/productStateManagement";
import Swal from "sweetalert2";
import {initialCheckCustomerCode} from "../../state/customerStateManagement";

const productAction = new ProductAction();

export type Props = {

    children?: React.ReactNode;
}

export const ProductsContext = React.createContext<ProductsState>({
    search: initialSearchState,
    productPage: initialProductPageState,
    product: initialProduct,
    checkProductCode : initialCheckProductCode,
    duplicateProductrCodeResult:initialDuplicateProductCodeResult,
    duplicateCheck(productCode:string, handleResult: (result: boolean) => void): void{},
    setCheckProductCode(): void{},
    duplicateCheckProductCode(productCode:string): void{},
    setProductCodeAndName(): void {},
    setPage(page: number): void {},
    getProductList(): void {},
    getProduct(productNo: number): void {},
    regiProducts(productCode: string, productName: string, standard: string, unit: number,weight: number, price: number): void {},
    updateProduct(productNo: number, productCode: string, productName: string, standard: string,
                  unit: number, weight: number, price: number): void{},
    deleteProduct(productNo: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            // 비동기 작업 수행 (예: 서버 요청 등)
            // 성공 시 resolve(true), 실패 시 reject(false) 등으로 처리
            resolve(true);
        });
    },
    cleanProduct() : void {},
    getInitProduct() : void {}
});

export class ProductsContextProvider extends Component<Props, ProductsState> {
    state: ProductsState = {
        search: initialSearchState,
        productPage: initialProductPageState,
        product: initialProduct,
        checkProductCode : initialCheckProductCode,
        duplicateCheckProductCode(productCode: string) {
        },
        duplicateProductrCodeResult:initialDuplicateProductCodeResult,
        setCheckProductCode: (productCode:string) =>{
/*            this.setState((prevState) =>({
                    checkProductCode: {
                        ...prevState.checkProductCode,
                        productCode: productCode
                    }
                }), () => {
                this.duplicateCheck()
                }
            );*/
        },
        duplicateCheck: (productCode:string, callback: (result: boolean) => void) => {
            productAction.duplicateCheckProductCode(productCode)
                .then((result) => {
                    let data = result?.data;
                    this.setState({duplicateProductrCodeResult: {duplicateResult: Boolean(data)}},
                        () => callback(data));
                }).catch(error => {
                this.printErrorAlert(error);
            });
        },

        setProductCodeAndName: (productCode: string, productName: string) => {
            this.setState((prevState) => ({
                    search: {
                        ...prevState.search,
                        productCode: productCode,
                        productName: productName,
                    },
                }), () => {
                    this.getProductList();
                }
            );
        },
        setPage: (page: number) => {
            this.setState((prevState) => ({
                    search: {
                        ...prevState.search,
                        page: page,
                    },
                }), () => {
                    this.getProductList();
                }
            );
        },
        getProductList: () => {
            this.getProductList();
        },
        getProduct: (productNo: number) => {
            productAction.getProduct(productNo)
                .then(result => {
                    let data = result?.data;
                    this.setState({product: data});
                });
        },


        regiProducts: (productCode: string, productName: string, standard: string, unit: number, weight: number, price: number) => {
            // productAction을 이용하여 제품 등록 요청을 보냅니다.
            console.log("e등록");
            productAction.regiProducts(productCode, productName, standard, unit ,weight, price)
                .then((result) => {

                })
                .catch((error) => {
                    // 제품 등록 중 오류가 발생한 경우에 대한 처리를 추가할 수 있습니다.
                    console.error("Error registering product:", error);
                });
        },
        updateProduct: function (productNo: number, productCode: string, productName: string, standard: string,
                                 unit: number, weight: number, price: number): void {
            productAction
                .updateProduct(productNo, productCode, productName, standard, unit, weight, price)
                .then((result) => {
                    const updatedProduct = {
                        productNo,
                        productCode,
                        productName,
                        price,
                        standard,
                        weight,
                        unit,
                    };

                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        },

        deleteProduct: async (productNo: number): Promise<boolean> => {
            try {
                // Assuming productAction.deleteProduct returns a Promise<boolean>
                const result = await productAction.deleteProduct(productNo);
                if (result) {

                    return true;
                } else {
                    // Handle case where deletion was not successful
                    return false;
                }
            } catch (error) {
                // Handle errors here
                console.error("Error deleting product:", error);
                return false;
            }
        },
        cleanProduct:() =>{
            this.setState({product:initialProduct, search:initialSearchState})
        },
        getInitProduct: () => {
            productAction.getProductList(this.state.search)
                .then((result) => {
                    this.setState({productPage: result?.data}, () => {
                        // 업데이트된 상태에서 첫 번째 고객의 번호를 가져와 getCustomer 메서드를 호출합니다.
                        if(this.state.productPage.list.length){
                        this.state.getProduct(this.state.productPage.list[0].productNo);
                        }
                    });
                })
                .catch(error => {
                    // 에러가 발생한 경우 에러를 처리하는 printErrorAlert 메서드를 호출합니다.
                    this.printErrorAlert(error);
                });
        }
    };
    duplicateCheck = (productCode:string) => {
        productAction.duplicateCheckProductCode(productCode)
            .then((result) => {
                let data = result?.data;
                console.log(data);
                this.setState({duplicateProductrCodeResult: data},
                    () => {
                        if(data.duplicateResult){
                            Swal.fire({
                                icon: "success",
                                text: "사용 가능한 품목 코드입니다."
                            });

                        }else{
                            Swal.fire({
                                icon: "error",
                                text: "사용이 불가능한 품목 코드입니다."
                            });
                        }
                    });
            }).catch(error => {
            this.printErrorAlert(error);
        });
    }


    getProduct = (productNo: number) => {
        productAction.getProduct(productNo)
            .then(result => {
                let data = result?.data;
                console.log(data);
            })
    };

    getProductList = () => {
        productAction.getProductList(this.state.search)
            .then((result) => {
                let data = result?.data;
                this.setState({productPage: data});
            })
    };


    //   updateProduct = () => {
    //   const { productNo, productName, productCode, standard, unit } = this.state.product;
    //
    //   // Assuming your updateProduct method in productAction takes 5 separate arguments
    //   productAction
    //       .updateProduct(productNo, productCode, productName, standard, unit)
    //       .then((result) => {
    //         // Assuming you want to update the state with the new product data
    //         const updatedProduct = {
    //           productNo,
    //           productCode,
    //           productName,
    //           standard,
    //           unit,
    //         };
    //
    //         this.setState((prevState) => ({
    //           product: {
    //             ...prevState.product,
    //             ...updatedProduct,
    //           },
    //         }));
    //
    //         alert("업데이트되었습니다");
    //       })
    //       .catch((error) => {
    //         console.error("Error updating product:", error);
    //       });
    // };
    printErrorAlert = (message : string) => {
        Swal.fire({
            icon: "warning",
            text: message
        });
    }

    render() {
        return (
            <ProductsContext.Provider value={this.state}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}