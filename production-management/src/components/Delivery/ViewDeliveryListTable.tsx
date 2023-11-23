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
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';

import "./../../assets/css/Table.css";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";

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
    tableSize: boolean
}

class ViewDeliveryListTable extends Component<Props>{
    static contextType = DeliveriesContext;

    render() {
        const state = this.context as DeliveriesState;
        const list = state.deliveryPage.list || [];

        const handleNextPage = () => {
            if (state.deliveryPage.hasNextPage) {
                state.setPage(state.search.page + 1);
            }
        };

        const handlePrevPage = () => {
            if (state.deliveryPage.hasPreviousPage) {
                state.setPage(state.search.page - 1);
            }
        };

        return (
            <>
                <span className='table-header'>출고 목록</span>
                <TableContainer className='table-container' style={{
                    height: this.props.tableSize ? '330px' : '90px',
                    transition: 'height 0.3s ease-in-out'
                }}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>출고 상태</TableCell>
                                <TableCell align="center" style={boldCellStyle}>출고 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>담당자</TableCell>
                                <TableCell align="center" style={boldCellStyle}>출고일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>지시 개수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 && list.map((row) => (
                                <TableRow key={row.deliveryNo} className='cellHoverEffect'
                                            onClick={() => state.getDelivery(row.deliveryNo)}>
                                    <TableCell align="center" style={cellStyle}>
                                        {row.deliveryStatus === 'COMPLETE' ? '완료' : '미완료'}
                                    </TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.deliveryNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.employeeName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.deliveryDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.instructionCount}</TableCell>
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
                        <KeyboardArrowLeft onClick={handlePrevPage} />
                        <KeyboardArrowRight onClick={handleNextPage} />
                    </Box>
                </TableContainer>
            </>
        );
    }
}

export default ViewDeliveryListTable;