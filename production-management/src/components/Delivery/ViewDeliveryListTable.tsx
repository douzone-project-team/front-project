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
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5'
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
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={require('./../../images/icon/list.png')} style={{width: '20px'}}/>
                    <span className='table-header'
                      style={{fontWeight: 'bold', fontSize: '16px'}}> 출고 목록 - <span style={{color:'rgb(60, 80, 194)'}}>{list.length}</span>건</span>
                </div>
                <TableContainer className='table-container' style={{
                    height: this.props.tableSize ? '67.2%' : '20%',
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
                                    <TableCell align="center" style={{fontWeight: 'bold'}}>
                                        {row.deliveryNo}</TableCell>
                                    <TableCell align="center">{row.employeeName}</TableCell>
                                    <TableCell align="center">{row.deliveryDate}</TableCell>
                                    <TableCell align="center">{row.instructionCount}</TableCell>
                                    <TableCell align="center" style={{width: '50px'}}>
                                        <div className={row.deliveryStatus}>
                                            {row.deliveryStatus === 'COMPLETE' ? '완료' : '미완료' }
                                        </div>
                                    </TableCell>
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