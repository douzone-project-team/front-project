import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import "./../../assets/css/Table.css";
import {AddProduct} from "../../object/DeliveryInstruction/delivery-instruction-object";
import {DetailTitle} from "../../core/DetailTitle";

type Props = {
  instructionNo: string,
  setProduct: (product: AddProduct) => void,
}

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light',
  minWidth: '170px',
  fontSize: '17px'
};

class ViewDeliveryInstructionTable extends Component<Props> {
  static contextType = InstructionsContext;

  componentDidMount() {
    const {instructionNo} = this.props;
    this.context.getInstruction(instructionNo);
  }

  render() {
    const state = this.context as InstructionsState;
    const list = state.instruction.products;

    const {setProduct, instructionNo} = this.props as Props;

    return (
        <>
          <div style={{width: '95%'}}>
            <DetailTitle options={{
              targetName: this.props.instructionNo as string,
              title: '지시 상세'
            }}/>
          </div>
          <TableContainer className='table-container'>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>수량</TableCell>
                  <TableCell align="center" style={boldCellStyle}>잔량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.length > 0 ? (
                    list.map((row) => (
                        <TableRow
                            className="cellHoverEffect"
                            onClick={() => setProduct({
                              instructionNo,
                              productNo: row.productNo,
                              productCode: row.productCode,
                              amount: row.amount,
                              remainAmount: row.remainAmount,
                            })}
                            key={row.productNo}>
                          <TableCell align="center">{row.productNo}</TableCell>
                          <TableCell align="center">{row.productCode}</TableCell>
                          <TableCell align="center">{row.productName}</TableCell>
                          <TableCell align="center">{row.amount}</TableCell>
                          <TableCell align="center">{row.remainAmount}</TableCell>
                        </TableRow>
                    ))
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    );
  }
}

export default ViewDeliveryInstructionTable;