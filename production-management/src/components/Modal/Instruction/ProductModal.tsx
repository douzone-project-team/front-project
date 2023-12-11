import {Component} from "react";
import {ProductsContext} from "../../../store/Product/products-context";
import {AddInstructionProduct} from "../../../object/Instruction/Instruction-object";
import "./../../../assets/css/Modal.css"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {TableBox} from "../../../core/box/TableBox";
import {SearchBox} from "../../../core/box/SearchBox";
import {TextInput} from "../../../core/input/TextInput";
import {ProductsState} from "../../../object/Product/product-object";
import {BarBox, BarLeftBox, BarRightBox} from "../../../core/box/BarBox";
import {SearchButton} from "../../../core/button/SearchButton";
import {ListTitle} from "../../../core/ListTitle";
import {PageButton} from "../../../core/button/PageButton";
import DashboardIcon from '@material-ui/icons/Dashboard';

type ProductModalProps = {
  onClose: () => void,
  addInstructionProduct: (productNo: number, amount: number) => void
}

type ProductModalState = {
  product: AddInstructionProduct,
  productCode: string;
  productName: string;
  isModalOpen?: boolean;
}

const boldCellStyle = {
  border: '1px solid #D3D3D3',
  fontWeight: 'bold',
  width: '10%',
};

const cellStyle = {
  border: '1px solid #D3D3D3',
  width: '10%',
};


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
      productName: "",
      productCode: "",
    }
  }

  handleSearchClick = () => {
    const state = this.context as ProductsState;
    state.setProductCodeAndName(this.state.productCode, this.state.productName);
  };

  handleAddClick = () => {
    console.log(`모달 클릭됨`);
    this.setState({
      isModalOpen: true,
    });
  };
  setProduct = (product: AddInstructionProduct) => {
    this.setState({product: product});
  }

  addInstructionProduct = () => {
    if (this.state.product.amount <= 0) {
      alert('수량을 올바르게 입력해주세요.');
      return;
    }

    const {onClose, addInstructionProduct} = this.props;
    addInstructionProduct(this.state.product.productNo, this.state.product.amount);
    onClose();
  }

  handleAmountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newAmount = parseInt(event.target.value, 10);
    this.setState((prevState) => ({
      product: {...prevState.product, amount: newAmount},
    }));
  }

  render() {
    const {onClose} = this.props;
    const {product} = this.state;

    const state = this.context as ProductsState;
    const list = state.productPage.list;

    const handleNextPage = () => {
      if (state.productPage.hasNextPage) {
        state.setPage(state.search.page + 1);
      }
    };

    const handlePrevPage = () => {
      if (state.productPage.hasPreviousPage) {
        state.setPage(state.search.page - 1);
      }
    };

    return (
        <div className='modal'>
          <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '685px', width: '700px'}}>
            <div className="modalHeader" style={{height: '55px'}}>
              <div style={{display: 'flex'}}><DashboardIcon/>&nbsp;품목 등록</div>
              <button className="close" onClick={onClose}>
                &times;
              </button>
            </div>
            <main>
              <SearchBox p='5px'>
                <BarBox>
                  <BarLeftBox width='60%'>
                    <TextInput
                        title='상품 코드'
                        onChange={(e) => {
                          this.setState({productCode: e.target.value})
                        }}
                        label={{ml: '10px'}}
                        input={{width: '80px'}}
                    />
                    <TextInput
                        title='상품 이름'
                        onChange={(e) => {
                          this.setState({productName: e.target.value})
                        }}
                        label={{ml: '10px'}}
                        input={{width: '80px'}}
                    />
                  </BarLeftBox>
                  <BarRightBox>
                    <SearchButton size={25} onClick={this.handleSearchClick}/>
                  </BarRightBox>
                </BarBox>
              </SearchBox>
              <TableBox p='15px' height='465px'>
                <Box>
                  <ListTitle options={{title: '품목 목록', count: list.length}}/>
                  <TableContainer className='table-container' style={{height: '405px'}}>
                    <Table size='small' className='table'>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" style={boldCellStyle}>상품 번호</TableCell>
                          <TableCell align="center" style={boldCellStyle}>상품 코드</TableCell>
                          <TableCell align="center" style={boldCellStyle}>상품 이름</TableCell>
                          <TableCell align="center" style={boldCellStyle}>단위</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {list && list.length > 0 && list.map((row) => (
                            <TableRow className='cellHoverEffect'
                                      onClick={() => this.setProduct({
                                        productNo: row.productNo,
                                        productCode: row.productCode,
                                        amount: 0,
                                      })}>
                              <TableCell align="center"
                                         style={cellStyle}>{row.productNo}</TableCell>
                              <TableCell align="center"
                                         style={cellStyle}>{row.productCode}</TableCell>
                              <TableCell align="center"
                                         style={cellStyle}>{row.productName}</TableCell>
                              <TableCell align="center" style={cellStyle}>{row.unit} EA</TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <PageButton options={{
                      currentPage: state.productPage.currentPage,
                      handleNextPage: handleNextPage,
                      handlePrevPage: handlePrevPage,
                      hasNextPage: state.productPage.hasNextPage,
                      hasPreviousPage: state.productPage.hasPreviousPage
                    }}/>
                  </TableContainer>
                </Box>
              </TableBox>
            </main>
            {product.productNo !== 0 && (
                <Box
                    sx={{
                      height: '40px',
                      border: '1.4px solid #D3D3D3',
                      marginTop: '10px',
                      marginBottom: '10px',
                      marginLeft: '20px',
                      marginRight: '20px',
                      borderRadius: '10px'
                    }}
                >
                  <TextInput
                      title='상품 코드'
                      readOnly
                      value={this.state.product.productCode}
                      input={{width: '100px'}}
                      label={{ml: '10px'}}
                  />
                  <TextInput
                      title='상품 이름'
                      readOnly
                      value={this.state.product.productCode}
                      input={{width: '100px'}}
                      label={{ml: '10px'}}
                  />
                  <TextInput
                      title='수량'
                      input={{width: '100px'}}
                      label={{ml: '10px'}}
                      onBlur={this.handleAmountBlur}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="submit"
                          style={{
                            width: '50px',
                            height: '27px',
                            marginTop: '6px',
                            borderRadius: '10px',
                            backgroundColor: '#0C70F2',
                            color: '#FFFFFF'
                          }}
                          onClick={this.addInstructionProduct}>등록
                  </button>
                </Box>
            )}
          </section>
        </div>
    );
  }
}

export default ProductModal;