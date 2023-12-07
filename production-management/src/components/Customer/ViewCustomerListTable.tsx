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


const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light'
}




class ViewCustomerListTable extends Component {
    static contextType = CustomersContext;

    componentDidMount() {
        const state = this.context as CustomersState;
        state.getCustomerList();
        state.getCustomer(1);
    }

    state = {
        selectedRowIndex: 0,
    };

    handleRowClick = (index: number) => {
        this.setState({ selectedRowIndex: index });
    };

    render() {
        const state = this.context as CustomersState;
        const list = state.customerPage.list;

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
                <TableContainer className='table-container' style={{height:'410px'}}>
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
                            {list.map((row, index) => (
                                <TableRow key={row.customerNo}
                                          className={`cellHoverEffect ${this.state.selectedRowIndex === index ? 'selectedRow' : ''}`}
                                          onClick={() => {
                                              this.handleRowClick(index);
                                              state.getCustomer(row.customerNo);
                                          }}>
                                    <TableCell align="center" style={tableCellStyle}>{row.customerNo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.customerCode}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.customerName}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.ceo}</TableCell>
                                    <TableCell align="center" style={tableCellStyle}>{row.sector}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PageButton options={{
                        currentPage: state.customerPage.currentPage,
                        handleNextPage: handleNextPage,
                        handlePrevPage: handlePrevPage,
                        hasNextPage: state.customerPage.hasNextPage,
                        hasPreviousPage: state.customerPage.hasPreviousPage
                    }}/>
                </TableContainer>
            </>
        );
    }
}

export default ViewCustomerListTable;