import React, {Component} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";

import "./../../assets/css/Table.css";
import {AddInstruction} from "../../object/DeliveryInstruction/delivery-instruction-object";
import { ListTitle } from "../../core/ListTitle";
import { PageButton } from "../../core/button/PageButton";
import {NullText} from "../../core/NullText";
import {Loading} from "../../core/Loading";

type Props = {
    setInstruction: (addInstruction: AddInstruction) => void
    tableSize: boolean,
}

const cellStyle = {
    fontFamily: 'S-CoreDream-3Light',
    fontSize: '16px',
}
const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light',
    fontSize: '17px'
};


class ViewDeliveryInstructionListTable extends Component<Props> {
    static contextType = InstructionsContext;

    render() {
        const state = this.context as InstructionsState;
        const list = state.instructionPage.list;
        const currentPage = state.instructionPage.currentPage;

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
                <ListTitle options={{title: '지시 목록', count: list.length}}/>
                <TableContainer className='table-container' style={{
                    height: '340px'
                }}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>담당자</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처 명</TableCell>
                                <TableCell align="center" style={boldCellStyle}>시작일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>종료일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 ? list.map((row) => (
                                <TableRow className='cellHoverEffect'
                                          onClick={() => setInstruction({
                                              instructionNo: row.instructionNo,
                                              instructionDate: row.instructionDate,
                                              expirationDate: row.expirationDate,
                                              customerName: row.customerName,
                                          })}
                                    key={row.instructionNo}>
                                    <TableCell align="center" className='cellHoverEffect' style={{...cellStyle, fontWeight: 'bold'}}
                                               onClick={() => state.getInstruction(row.instructionNo)}>{row.instructionNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.employeeName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.customerName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.instructionDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{row.expirationDate}</TableCell>
                                </TableRow>
                            )) :
                            <TableRow>
                                <TableCell colSpan={7} style={{border: '0'}}>
                                    {currentPage != -1 ? <NullText/> : <Loading/>}
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                    {currentPage != -1 && list.length > 0 ?
                    <PageButton options={{
                        currentPage: state.instructionPage.currentPage,
                        handleNextPage: handleNextPage,
                        handlePrevPage: handlePrevPage,
                        hasNextPage: state.instructionPage.hasNextPage,
                        hasPreviousPage: state.instructionPage.hasPreviousPage
                    }}/> : null}
                </TableContainer>
            </>
        );
    }
}

export default ViewDeliveryInstructionListTable;