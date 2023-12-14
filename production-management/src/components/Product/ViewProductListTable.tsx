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
import { ListTitle } from "../../core/ListTitle";
import { PageButton } from "../../core/button/PageButton";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light'
}

export type ProductList = {
    productNo: number;
    productCode: string;
    productName: string;
    price:number;
    unit: number;
};

interface ViewTableState {  // 추가
    isModalOpen: boolean;
    selectedProductNo: number | null;
}

class ViewProductListTable extends Component<{}, ViewTableState> {  // 수정
    static contextType = ProductsContext;

    state: ViewTableState = {  // 수정
        isModalOpen: false,
        selectedProductNo: null,
    };

    componentDidMount() {
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
                <ListTitle options={{title: '품목 목록', count: list.length}}/>
                <TableContainer className='table-container' style={{height:'330px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품명</TableCell>
                                <TableCell align="center" style={boldCellStyle}>가격(원)</TableCell>
                                <TableCell align="center" style={boldCellStyle}>단위</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row: ProductList) => (
                                <TableRow
                                    key={row.productNo}
                                    className='cellHoverEffect'
                                    onClick={() => state.getProduct(row.productNo)}
                                >
                                    <TableCell align="center" style={tableCellStyle}>{row.productNo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.productCode}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.productName}</TableCell>
                                    <TableCell align="right" style={{ ...tableCellStyle, paddingRight: '7.2%' }}>{row.price.toLocaleString()}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.unit}</TableCell>
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
                    }}
                    />
                </TableContainer>
            </Box>
        );
    }
}

export default ViewProductListTable;
