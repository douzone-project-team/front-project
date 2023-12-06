import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import "./../../assets/css/Table.css";

import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {PageButton} from "../../core/button/PageButton";
import {ListTitle} from "../../core/ListTitle";

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
  fontFamily: 'S-CoreDream-3Light'
}

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
          <ListTitle options={{title: '지시 목록', count: list.length}}/>
          <TableContainer className='table-container' style={{
            height: this.props.tableSize ? '67.5%' : '20%',
            transition: 'height 0.3s ease-in-out',
          }}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow style={{fontFamily: 'S-CoreDream-3Light'}}>
                  <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>등록자</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>만료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.length > 0 && list.map((row) => (
                    <TableRow className='cellHoverEffect'
                              onClick={() => {
                                state.getInstruction(row.instructionNo);
                                this.props.changeAmountStatusFalse();
                              }}>
                      <TableCell align="center" style={tableCellStyle}>{row.instructionNo}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.employeeName}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.customerNo}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.customerName}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.instructionDate}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.expirationDate}</TableCell>
                      <TableCell align="center" style={{width: '50px'}}>
                        <div className={row.progressStatus}>
                          {row.progressStatus}
                        </div>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            <PageButton options={{
              currentPage: state.instructionPage.currentPage,
              handleNextPage: handleNextPage,
              handlePrevPage: handlePrevPage,
              hasNextPage: state.instructionPage.hasNextPage,
              hasPreviousPage: state.instructionPage.hasPreviousPage
            }}
            />
          </TableContainer>
        </>
    );
  }
}

export default ViewInstructionTable;