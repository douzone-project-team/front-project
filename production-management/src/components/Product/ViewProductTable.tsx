import React, {Component} from "react";
import {
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {ProductsContext} from "../../store/Product/products-context";
import {ProductsState} from "../../object/Product/product-object";

import "./../../assets/css/Table.css";
import ModalProduct from "../Modal/Product/UpdateProduct";
import {DetailTitle} from "../../core/DetailTitle";
import {EditButton} from "../../core/button/EditButton";
import {DeleteButton} from "../../core/button/DeleteButton";
import Swal from "sweetalert2";
import {EmptyText} from "../../core/EmptyText";

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
  fontFamily: 'S-CoreDream-3Light'
}

interface DetailState {
  isModalOpen?: boolean;
  history: any;
}

class ViewProductTable extends Component<{}, DetailState> {
  static contextType = ProductsContext;

  constructor(props: {}) {
    super(props);
    this.state = {
      isModalOpen: false,
      history: null, // 여기에 history 속성 추가
    };
  }

  componentDidMount() {
    this.checkReload();
  }

  componentDidUpdate(prevProps: any, prevState: DetailState) {
    if (this.state.isModalOpen !== prevState.isModalOpen) {
    }
  }

  checkReload() {
    const state = this.context as ProductsState;
    const product = state.product;

    product.productNo = 0;
    product.productCode = '';
    product.productName = '';
    product.price = 0;
    product.standard = '';
    product.weight = 0;
    product.unit = 0;

  }

  handlerModify = () => {
    const state = this.context as ProductsState;
    const product = state.product;
    if (product.productNo !== 0) {
      this.setState({
        isModalOpen: true,
        history: product,
      });
    } else {
      Swal.fire({
        title: "품목을 선택해주세요",
      })
    }
  };handlerDelete = async (productNo: number) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 후 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        const state = this.context as ProductsState;
        state.deleteProduct(productNo);
        Swal.fire({
          icon: "success",
          text: "삭제되었습니다."
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }



  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const state = this.context as ProductsState;
    const product = state.product;


    return (
        <>
          <div style={{
            display: 'flex',
            height: '30px',
            marginTop: '20px'
          }}>
            <div style={{width: '95%'}}>
              <DetailTitle options={{
                targetName: product.productNo as unknown as string,
                title: '품목 상세'
              }}/>
            </div>
            <div style={{width: '5%', textAlign: 'right'}}>
              <EditButton size={20} onClick={this.handlerModify}/>
              &nbsp;&nbsp;
              <DeleteButton size={20} onClick={() => this.handlerDelete(product.productNo)}/>
            </div>
          </div>

          <TableContainer className='table-container' style={{height: '73px'}}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>가격</TableCell>
                  <TableCell align="center" style={boldCellStyle}>규격</TableCell>
                  <TableCell align="center" style={boldCellStyle}>무게</TableCell>
                  <TableCell align="center" style={boldCellStyle}>단위</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product && product.productNo !== 0 && product.unit !== 0?
                    <TableRow>
                      <TableCell align="center" style={tableCellStyle}>{product.productNo}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{product.productCode}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{product.productName}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{product.price.toLocaleString() + '원'}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{product.standard}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{product.weight.toLocaleString() + 'g'}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{product.unit.toLocaleString() + 'EA'}</TableCell>
                    </TableRow> :
                    <TableRow>
                      <TableCell colSpan={6} style={{border: '0'}}>
                        <EmptyText mt={'0px'}/>
                      </TableCell>
                    </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
              open={this.state.isModalOpen ?? false}
              onClose={this.handleCloseModal}
              closeAfterTransition
              BackdropProps={{
                invisible: true,
                timeout: 500,
              }}
              style={{
                zIndex: 1, // 원하는 z-index 값으로 설정
              }}
          >
            <Fade in={this.state.isModalOpen || false}>
              <Paper
                  style={{
                    width: "400px",
                    maxHeight: "80%",
                    overflowY: "auto",
                    margin: "auto",
                    border: "5",
                    borderRadius: 0,
                    boxShadow: "10",
                  }}
              >
                <ModalProduct
                    handleCloseModal={this.handleCloseModal}
                    product={this.state.history}
                />
              </Paper>
            </Fade>
          </Modal>
        </>
    );
  }
}

export default ViewProductTable;