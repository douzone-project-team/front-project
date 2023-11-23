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
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';

import "./../../assets/css/Table.css";
import {AddInstruction} from "../../object/DeliveryInstruction/delivery-instruction-object";

type Props = {
    setInstruction: (addInstruction: AddInstruction) => void
    tableSize: boolean
}

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
};

class ViewDeliveryInstructionListTable extends Component<Props> {
    static contextType = InstructionsContext;

    render() {
        const state = this.context as InstructionsState;
        const list = state.instructionPage.list;

        const handleNextPage = () => {
            if (state.instructionPage.hasNextPage) {
                state.setPage(state.search.page + 1);
            }
        };

        const handlePrevPage = () => {
            if (state.instructionPage.hasPreviousPage) {
                state.setPage(state.search.page - 1);
            }
        };

        const {setInstruction} = this.props as Props;

        return (
            <>
                <span className='table-header'>지시 목록</span>
                <TableContainer className='table-container' style={{
                    height: this.props.tableSize ? '330px' : '90px',
                    transition: 'height 0.3s ease-in-out'
                }}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>등록자</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처 명</TableCell>
                                <TableCell align="center" style={boldCellStyle}>시작일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>종료일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row) => (
                                <TableRow className='cellHoverEffect'
                                          onClick={() => setInstruction({
                                              instructionNo: row.instructionNo,
                                              instructionDate: row.instructionDate,
                                              expirationDate: row.expirationDate,
                                              customerName: row.customerName,
                                          })}
                                    key={row.instructionNo}>
                                    <TableCell align="center" style={cellStyle} className='cellHoverEffect'
                                               onClick={() => state.getInstruction(row.instructionNo)}>{row.instructionNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.employeeName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.customerName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.instructionDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.expirationDate}</TableCell>
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
                        >
                            이전 페이지
                        </KeyboardArrowLeft>
                        <KeyboardArrowRight
                            onClick={handleNextPage}
                        >
                            다음 페이지
                        </KeyboardArrowRight>
                    </Box>
                </TableContainer>
            </>
        );
    }
}

export default ViewDeliveryInstructionListTable;