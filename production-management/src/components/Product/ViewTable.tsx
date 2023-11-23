import React, { Component } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,  // 추가
  Backdrop,  // 추가
  Fade,  // 추가
} from "@material-ui/core";

import { ProductsContext } from "../../store/Product/products-context";
import { ProductsState } from "../../object/Product/product-object";
import "./../../assets/css/Table.css";

export type ProductList = {
  productNo: number;
  productCode: string;
  productName: string;
  unit: number;
};

interface ViewTableState {  // 추가
  isModalOpen: boolean;
  selectedProductNo: number | null;
}

class ViewTable extends Component<{}, ViewTableState> {  // 수정
  static contextType = ProductsContext;

  state: ViewTableState = {  // 수정
    isModalOpen: false,
    selectedProductNo: null,
  };

  componentDidMount() {
    console.log("컴포넌트가 마운트됐습니다.");

    const state = this.context as ProductsState;
    state.getProductList();
  }

  handleRowClick = (productNo: number) => {
    console.log(`TableRow 클릭됨: ${productNo}`);
    this.setState({
      isModalOpen: true,
      selectedProductNo: productNo,
    });
  };

  handleCloseModal = () => {  // 추가
    this.setState({
      isModalOpen: false,
      selectedProductNo: null,
    });
  };

  render() {
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
        <Box
            sx={{
              width: "125vh",
              height: "13vh",
              ml: "10vh",
              mt: "5vh",
              p: 0.5,
              color: "#FFFFFF",
            }}
        >
          <TableContainer className='table-container' style={{height:'350px'}}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="right">제품 번호</TableCell>
                  <TableCell align="right">제품 코드</TableCell>
                  <TableCell align="right">제품명</TableCell>
                  <TableCell align="right">단위</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row: ProductList) => (
                    <TableRow
                        key={row.productNo}
                        onClick={() => this.handleRowClick(row.productNo)}
                        style={{ cursor: "pointer" }}
                    >
                      <TableCell align="right">{row.productNo}</TableCell>
                      <TableCell align="right">{row.productCode}</TableCell>
                      <TableCell align="right">{row.productName}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
            >
              {state.productPage.hasPreviousPage && (
                  <Button
                      variant="outlined"
                      onClick={handlePrevPage}
                      style={{ marginLeft: "80vh" }}
                  >
                    이전 페이지
                  </Button>
              )}
              {state.productPage.hasNextPage && (
                  <Button
                      variant="outlined"
                      onClick={handleNextPage}
                      style={{ marginLeft: "105vh" }}
                  >
                    다음 페이지
                  </Button>
              )}
            </Box>
          </TableContainer>

          {/* 추가: 모달 렌더링 */}
          <Modal
              open={this.state.isModalOpen}
              onClose={this.handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                invisible: true,  // 주변 배경 어두움 효과 비활성화
                timeout: 500,
              }}
          >
            <Fade in={this.state.isModalOpen}>
              {/* 모달 컨텐츠 렌더링 */}
              <Paper
                  style={{
                    width: '400px',
                    maxHeight: '80%',
                    overflowY: 'auto',
                    margin: 'auto',
                    border: 'none',  // 테두리 제거
                    borderRadius: 0,  // 모달 모서리를 직각으로 만들기 위해
                    boxShadow: 'none',  // 그림자 제거
                  }}
              >
                {/*<ModalProduct*/}
                {/*    handleCloseModal={this.handleCloseModal}*/}
                {/*    productNo={this.state.selectedProductNo}*/}
                {/*/>*/}
              </Paper>
            </Fade>
          </Modal>
        </Box>
    );
  }
}

export default ViewTable;