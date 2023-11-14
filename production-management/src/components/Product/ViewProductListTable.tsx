import React, {Component} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {ProductsContext} from "../../store/Product/products-context";
import {ProductsState} from "../../object/Product/product-object";
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import {AddInstructionProduct} from "../../object/Instruction/Instruction-object";

import "./../../assets/css/Table.css";

const boldCellStyle = {
  border: '1px solid #D3D3D3',
  fontWeight: 'bold',
  width: '10%',
};

const cellStyle = {
  border: '1px solid #D3D3D3',
  width: '10%',
};

type Props = {
  setProduct: (addInstructionProduct: AddInstructionProduct) => void
}

class ViewProductListTable extends Component<Props> {
  static contextType = ProductsContext;

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

    const {setProduct} = this.props as Props;

    return (

        <Box>
          <TableContainer className='table-container'>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>상품 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>상품 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>상품 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>갯수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                    <TableRow
                        key={row.productNo}
                        // sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell align="center" style={cellStyle}>{row.productNo}</TableCell>
                      <TableCell align="center" style={cellStyle} onClick={() => setProduct({
                        productNo: row.productNo,
                        productCode: row.productCode,
                        amount: row.unit,
                      })}>{row.productCode}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.productName}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.unit}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
            >
              <KeyboardArrowLeft
                  onClick={handlePrevPage}
                  // disabled={!state.instructionPage.hasPreviousPage}
              >
                이전 페이지
              </KeyboardArrowLeft>
              <KeyboardArrowRight
                  onClick={handleNextPage}
                  // disabled={!state.instructionPage.hasNextPage}
              >
                다음 페이지
              </KeyboardArrowRight>
            </Box>
          </TableContainer>
        </Box>
    );
  }
}

export default ViewProductListTable;
