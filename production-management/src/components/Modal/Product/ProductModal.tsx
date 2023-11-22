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
  addInstructionProduct: (productNo: number, amount: number) => void
}

type ProductModalState = {
  product: AddInstructionProduct
  setProduct: (product: AddInstructionProduct) => void
  addInstructionProduct: () => void
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

      addInstructionProduct: () => {
        if(this.state.product.amount <= 0) {
          alert('수량을 올바르게 입력해주세요.');
          return;
        }
        
        const {onClose, addInstructionProduct} = this.props as ProductModalProps;
        addInstructionProduct(this.state.product.productNo, this.state.product.amount);
        onClose();
      }
    }
  }


  handleAmountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newAmount = parseInt(event.target.value, 10);

    if (newAmount <= 0 || newAmount === null || newAmount === undefined) {
      alert('수량을 올바르게 입력해주세요.');
      return;
    }

    this.setState((prevState) => ({
      product: {...prevState.product, amount: newAmount},
    }));
  }

  render() {
    const {onClose, status} = this.props as ProductModalProps;
    const {product, setProduct, addInstructionProduct} = this.state;

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
                          height: '40px',
                          border: '1.4px solid #D3D3D3',
                          marginTop: '10px',
                          marginBottom: '10px',
                          marginLeft: '20px',
                          marginRight: '20px'
                        }}
                    >
                      <label>
                        <span style={{
                          marginRight: '5px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}>상품 코드</span>
                        <input type="text" placeholder="상품 코드"
                               style={{height: '20px', marginTop: '6px', marginRight: '50px', width: '120px'}}
                               readOnly
                               value={this.state.product.productNo}
                        />
                      </label>
                      <label>
                        <span style={{
                          marginLeft: '10px',
                          marginRight: '5px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}>상품 이름</span>
                        <input type="text" placeholder="상품 코드"
                               style={{height: '20px', marginTop: '6px', marginRight: '50px', width: '120px'}}
                               readOnly
                               value={this.state.product.productCode}
                        />
                      </label>
                      <label>
                      <span style={{
                        marginLeft: '10px',
                        marginRight: '5px',
                        fontSize: '15px',
                        fontWeight: 'bold'
                      }}>수량</span>
                        <input
                            type="text"
                            placeholder="수량"
                            style={{height: '20px', marginTop: '6px', marginRight: '50px', width: '120px'}}
                            onBlur={this.handleAmountBlur}
                        />
                      </label>
                      <button type="submit"
                              style={{height: '27px', marginTop: '6px'}}
                              onClick={addInstructionProduct}>등록
                      </button>
                    </Box>
                )}
              </section>
          ) : null}
        </div>
    );
  }
}

export default ProductModal;