import React, {Component} from 'react';
import "./../../assets/css/Table.css";
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState} from "../../object/Customer/customer-object";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { ListTitle } from '../../core/ListTitle';
import { PageButton } from '../../core/button/PageButton';
import {NullText} from "../../core/NullText";
import {Loading} from "../../core/Loading";


const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light',
    fontSize: '16px'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light',
    fontSize: '16px'
}




class ViewCustomerListTable extends Component {
    static contextType = CustomersContext;

    componentDidMount() {
        const state = this.context as CustomersState;
        state.getCustomerList();
    }

    state = {
        selectedRowIndex: 1,
    };

    handleRowClick = (index: number) => {
        this.setState({ selectedRowIndex: index });
    };

    render() {
        const state = this.context as CustomersState;
        const list = state.customerPage.list;
        const currentPage = state.customerPage.currentPage;
        const handleNextPage = () => {
            if (state.customerPage.hasNextPage) {
                state.setPage(state.search.page + 1);
            }
        };

        const handlePrevPage = () => {
            if (state.customerPage.hasPreviousPage) {
                state.setPage(state.search.page - 1);
            }
        };

        return(
            <>
                <ListTitle options={{title: '거래처 목록', count: list.length}}/>
                <TableContainer className='table-container' style={{height:'450px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>거래처 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처 명칭</TableCell>
                                <TableCell align="center" style={boldCellStyle}>대표자</TableCell>
                                <TableCell align="center" style={boldCellStyle}>업종</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 ? list.map((row, index) => (
                                <TableRow key={row.customerNo}
                                          className={`cellHoverEffect ${this.state.selectedRowIndex === row.customerNo ? 'selectedRow' : ''}`}
                                          onClick={() => {
                                              this.handleRowClick(row.customerNo);
                                              state.getCustomer(row.customerNo);
                                          }}>
                                    <TableCell align="center" style={tableCellStyle}>{row.customerNo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.customerCode}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.customerName}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.ceo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.sector}</TableCell>
                                </TableRow>
                            )):
                                <TableRow>
                                    <TableCell colSpan={7} style={{border: '0'}}>
                                        {currentPage != -1 ? <NullText/> : <Loading/>}
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                    {currentPage != -1 && list.length > 0 ?
                    <PageButton options={{
                        currentPage: state.customerPage.currentPage,
                        handleNextPage: handleNextPage,
                        handlePrevPage: handlePrevPage,
                        hasNextPage: state.customerPage.hasNextPage,
                        hasPreviousPage: state.customerPage.hasPreviousPage
                    }}/>
                        : null
                    }
                </TableContainer>
            </>
        );
    }
}

export default ViewCustomerListTable;