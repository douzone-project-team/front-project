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

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5'
};

type Props = {
  tableSize: boolean,
  changeAmountStatusFalse: () => void;
}

class ViewInstructionTable extends Component<Props> {
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

    return (
        <>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={require('./../../images/icon/list.png')} style={{width: '20px'}}/>
            <span className='table-header'
                  style={{fontWeight: 'bold', fontSize: '16px'}}> 지시 목록</span>
          </div>
          <TableContainer className='table-container' style={{
            height: this.props.tableSize ? '65%' : '20%',
            transition: 'height 0.3s ease-in-out',
          }}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>등록자</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                  <TableCell align="center" style={boldCellStyle}>시작일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>종료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.length > 0 && list.map((row) => (
                    <TableRow key={row.instructionNo} className='cellHoverEffect'
                              onClick={() => {
                                state.getInstruction(row.instructionNo);
                                this.props.changeAmountStatusFalse();
                              }}>
                      <TableCell align="center" style={{fontWeight: 'bold'}}>{row.instructionNo}</TableCell>
                      <TableCell align="center">{row.employeeName}</TableCell>
                      <TableCell align="center">{row.customerNo}</TableCell>
                      <TableCell align="center">{row.customerName}</TableCell>
                      <TableCell align="center">{row.instructionDate}</TableCell>
                      <TableCell align="center">{row.expirationDate}</TableCell>
                      <TableCell align="center" style={{width: '50px'}}>
                        <div className={row.progressStatus}>{row.progressStatus}</div>
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
              <KeyboardArrowLeft onClick={handlePrevPage}/>
              <KeyboardArrowRight onClick={handleNextPage}/>
            </Box>
          </TableContainer>
        </>
    );
  }
}

export default ViewInstructionTable;