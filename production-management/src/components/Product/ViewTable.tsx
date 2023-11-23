import React, { Component } from "react";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";

import { ProductsContext } from "../../store/Product/products-context";
import { ProductsState } from "../../object/Product/product-object";
import "./../../assets/css/Table.css";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};
const cellStyle = {
    border: '1px solid #D3D3D3',
};


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
            <Box >
                <TableContainer className='table-container' style={{height:'350px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품명</TableCell>
                                <TableCell align="center" style={boldCellStyle}>단위</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row: ProductList) => (
                                <TableRow
                                    key={row.productNo}
                                >
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'
                                               onClick={() => state.getProduct(row.productNo)}>{row.productNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.productCode}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.productName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.unit}</TableCell>
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

export default ViewTable;
