import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";

import "./../../assets/css/Table.css";

const boldCellStyle = {
  border: '1px solid #D3D3D3',
  fontWeight: 'bold',
  width: '10%',
};

const cellStyle = {
  border: '1px solid #D3D3D3',
  width: '10%',
};

class ViewInstructionTable extends Component {
  static contextType = InstructionsContext;

  render() {
    const state = this.context as InstructionsState;
    const list = state.instruction.products;

    return (
        <>
          <span className='table-header'>지시 상세 :
            <span style={{color: '#0C70F2'}}>{state.instruction.instructionNo}</span>
          </span>
          <TableContainer className='table-container' style={{height:'170px'}}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>상품 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>상품 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>상품 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>갯수</TableCell>
                  <TableCell align="center" style={boldCellStyle}>잔량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                    <TableRow>
                      <TableCell align="center" style={cellStyle}>{row.productNo}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.productCode}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.productName}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.amount}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.remainAmount}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    );
  }
}

export default ViewInstructionTable;