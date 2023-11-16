import {Component} from 'react';
import "./../../assets/css/Table.css";
import {CustomersContext} from "../../store/Customer/customers-context";
import {CustomersState} from "../../object/Customer/customer-object";
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";


const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};



class ViewCustomerListTable extends Component {
    static contextType = CustomersContext;

    componentDidMount() {
        const state = this.context as CustomersState;
        state.getCustomerList();
    }

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
                <span className='table-header'>거래처 목록</span>
                <TableContainer className='table-container'>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>거래처 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처 명칭</TableCell>
                                <TableCell align="center" style={boldCellStyle}>업종</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list === undefined || list.map((row) => (
                                <TableRow key={row.customerNo}>
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'
                                               onClick={() => state.getCustomer(row.customerNo)}>{row.customerNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.customerCode}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.customerName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.sector}</TableCell>
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
            </>
        );
    }
}

export default ViewCustomerListTable;