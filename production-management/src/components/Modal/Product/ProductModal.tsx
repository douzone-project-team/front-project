import {Component} from "react";
import {ProductsContext} from "../../../store/Product/products-context";
import {ProductsState} from "../../../object/Product/product-object";
import {AddInstructionProduct} from "../../../object/Instruction/Instruction-object";
import "./../../../assets/css/Modal.css"
import ViewProductListTable from "../../../components/Product/ViewProductListTable";
import ProductSearchBar from "../../../components/Product/ProductSearchBar";
import {Box} from "@material-ui/core";

type ProductModalProps = {
  onClose: () => void,
  status: boolean,
  addProduct: (addInstructionProduct: AddInstructionProduct) => void
}

type ProductModalState = {
  product: AddInstructionProduct
  setProduct: (product: AddInstructionProduct) => void
  addProduct: () => void
}

export class ProductModal extends Component<ProductModalProps, ProductModalState> {
  static contextType = ProductsContext;

  constructor(props: ProductModalProps) {
    super(props);
    this.state = {
      product: {
        productNo: 0,
        productCode: '',
        amount: 0,
      },
      setProduct: (product: AddInstructionProduct) => {
        this.setState({product: product});
      },

      addProduct: () => {
        const {onClose, addProduct} = this.props as ProductModalProps;
        console.log('product');
        console.log(this.state.product);
        addProduct(this.state.product);
        onClose();
      }
    }
  }

  render() {
    const state = this.context as ProductsState;

    const {onClose, status} = this.props as ProductModalProps;
    const {product, setProduct, addProduct} = this.state;

    return (
        <div className='modal'>
          {status ? (
              <section>
                <header>
                  <button className="close" onClick={onClose}>
                    &times;
                  </button>
                </header>
                <main>
                  <ProductSearchBar/>
                  <ViewProductListTable setProduct={setProduct}/>
                </main>
                {product.productNo !== 0 && (
                    <Box
                        sx={{
                          height: '4vh',
                          border: '1.4px solid #D3D3D3',
                          marginBottom: '1vh',
                          marginLeft: '2vh',
                          marginRight: '2vh'
                        }}
                    >
                      <label>
                        <span style={{
                          marginRight: '0.5vh',
                          fontSize: '1.5vh',
                          fontWeight: 'bold'
                        }}>상품 코드</span>
                        <input type="text" placeholder="상품 번호"
                               style={{height: '2vh', marginTop: '0.6vh'}}
                               readOnly
                               value={this.state.product.productNo}
                        />
                      </label>
                      <label>
                        <span style={{
                          marginLeft: '1vh',
                          marginRight: '0.5vh',
                          fontSize: '1.5vh',
                          fontWeight: 'bold'
                        }}>상품 이름</span>
                        <input type="text" placeholder="상품 코드"
                               style={{height: '2vh', marginTop: '0.6vh'}}
                               readOnly
                               value={this.state.product.productCode}
                        />
                      </label>
                      <label>
                      <span style={{
                        marginLeft: '1vh',
                        marginRight: '0.5vh',
                        fontSize: '1.5vh',
                        fontWeight: 'bold'
                      }}>수량</span>
                        <input
                            type="number"
                            min={1} max={product.amount}
                            placeholder="수량"
                            style={{height: '2vh', marginTop: '0.6vh', marginRight: '2vh'}}
                            defaultValue={product.amount.toString()} // Convert to string to display the amount
                        />
                      </label>
                      <button type="submit"
                              style={{height: '2.7vh', marginTop: '0.6vh'}}
                              onClick={addProduct}>등록
                      </button>
                    </Box>
                )}
                {/*<footer>*/}
                {/*  <button className="close" onClick={onClose}>*/}
                {/*    close*/}
                {/*  </button>*/}
                {/*</footer>*/}
              </section>
          ) : null}
        </div>
    );
  }
}

export default ProductModal;