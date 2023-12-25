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
import {NullText} from "../../core/NullText";
import {Loading} from "../../core/Loading";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '17px'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '16px'
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
    selectedRowIndex: number,
}

class ViewProductListTable extends Component<{}, ViewTableState> {  // 수정
    static contextType = ProductsContext;


    state: ViewTableState = {  // 수정
        isModalOpen: false,
        selectedProductNo: null,
        selectedRowIndex: 1,
    };


    componentDidMount() {
        const state = this.context as ProductsState;
        const list = state.productPage.list;

        if (list && list.length > 0) {
            const selectedProductNo = list[0].productNo;

            if (selectedProductNo !== 1) {
                this.setState({ selectedProductNo, selectedRowIndex: selectedProductNo });
            }
        }

        state.getProductList();
    }




    handleRowClick = (index: number) => {
        this.setState({ selectedRowIndex: index });
    };

    render() {
        const state = this.context as ProductsState;
        const list = state.productPage.list;
        const currentPage = state.productPage.currentPage;


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
                <TableContainer className='table-container' style={{height:'450px'}}>
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
                            {list && list.length > 0 ? list.map((row, index) => (
                                <TableRow
                                    key={row.productNo}
                                    className={`cellHoverEffect ${this.state.selectedRowIndex === row.productNo ? 'selectedRow' : ''}`}
                                    onClick={() => {
                                        this.handleRowClick(row.productNo);
                                        state.getProduct(row.productNo);
                                    }}>
                                    <TableCell align="center" style={tableCellStyle}>{row.productNo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.productCode}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.productName}</TableCell>
                                    <TableCell align="right" style={{ ...tableCellStyle, paddingRight: '7.2%' }}>{row.price.toLocaleString()}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.unit.toLocaleString() + 'EA'}</TableCell>
                                </TableRow>
                            )):
                                <TableRow>
                                    <TableCell colSpan={7} style={{border: '0'}}>
                                        {currentPage != -1 ? <NullText/> : <Loading/>}
                                    </TableCell>
                                </TableRow>}
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
