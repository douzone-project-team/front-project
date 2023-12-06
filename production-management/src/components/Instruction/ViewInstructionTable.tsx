import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState, UpdateInstruction} from "../../object/Instruction/Instruction-object";

import "./../../assets/css/Table.css";
import ProductModal from "../Modal/Instruction/ProductModal";
import CustomerModal from "../Modal/Instruction/CustomerModal";
import {AddProductInstruction} from "../../object/ProductInstruction/product-instruction-object";
import {DetailTitle} from "../../core/DetailTitle";
import {DeleteButton} from "../../core/button/DeleteButton";
import {AddItemButton} from "../../core/button/AddItemButton";
import {EditButton} from "../../core/button/EditButton";
import {EditInput} from "../../core/input/EditInput";

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light',
};

const tableCellStyle = {
  fontFamily: 'S-CoreDream-3Light',
}

type Props = {
  tableSize: boolean,
  productModalOpen: boolean,
  customerModalOpen: boolean,
  changeProductModalStatus: () => void,
  changeCustomerModalStatus: () => void,
  changeAmount: boolean,
  changeAmountStatus: () => void,
}

class ViewInstructionTable extends Component<Props> {

  static contextType = InstructionsContext;

  updateInstruction = (
      changes: { instructionDate?: string; expirationDate?: string; customerNo?: number }
  ) => {
    const state = this.context as InstructionsState;
    const instruction = state.instruction;

    const updateInstruction = {
      instructionNo: instruction.instructionNo,
      instructionDate: changes.instructionDate !== undefined ? changes.instructionDate : instruction.instructionDate,
      expirationDate: changes.expirationDate !== undefined ? changes.expirationDate : instruction.expirationDate,
      customerNo: changes.customerNo !== undefined ? changes.customerNo : instruction.customerNo,
    } as UpdateInstruction;

    state.updateInstruction(updateInstruction);
  };

  updateProduct = (amount: number, productNo: number) => {
    const state = this.context as InstructionsState;
    state.updateInstructionProduct(amount, productNo);
  };

  addInstructionProduct = (productNo: number, amount: number) => {
    const state = this.context as InstructionsState;
    const instructionNo = state.instruction.instructionNo;
    const instruction: AddProductInstruction = {
      instructionNo,
      productNo,
      amount,
    };
    state.addProductInstruction(instruction);
  }

  render() {
    const {
      instruction,
      deleteInstruction,
    } = this.context as InstructionsState;

    const list = instruction.products;
    const {
      changeProductModalStatus,
      changeCustomerModalStatus,
      productModalOpen,
      customerModalOpen,
      changeAmount,
      changeAmountStatus
    } = this.props;

    return (
        <>
          <div style={{
            display: 'flex',
            height: '20px'
          }}>
            <div style={{width: '95%'}}>
              <DetailTitle options={{
                status: instruction.progressStatus,
                targetName: instruction.instructionNo as string,
                title: '지시 상세'
              }}/>
            </div>
            <div style={{width: '5%', textAlign: 'right'}}>
              {instruction.progressStatus == 'STANDBY' &&
                  <DeleteButton onClick={() => deleteInstruction(instruction.instructionNo)}/>}
            </div>
          </div>
          <TableContainer className='table-container' style={{
            height: this.props.tableSize ? '18.1%' : '66%',
            transition: 'height 0.3s ease-in-out'
          }}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>거래처 명</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>만료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>갯수</TableCell>
                  <TableCell align="center" style={boldCellStyle}>잔량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.length > 0 && list.map((row) => (
                    <TableRow>
                      <TableCell align="center" style={tableCellStyle}>{instruction.customerName}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{instruction.instructionDate}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productNo}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productCode}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productName} </TableCell>
                      <TableCell align="center">
                        {!changeAmount ?
                            <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                              <div style={{width: '99%'}}>
                                {row.amount}
                              </div>
                              <div style={{width: '1%'}}>
                                {instruction.progressStatus == 'STANDBY' ?
                                    <EditButton onClick={changeAmountStatus}/> : null}
                              </div>
                            </div> :
                            <input type='number' defaultValue={row.amount}
                                   onBlur={(e) => {
                                     this.updateProduct(e.target.value as unknown as number, row.productNo);
                                     changeAmountStatus();
                                   }}/>
                        }
                      </TableCell>
                      <TableCell align="center">{row.remainAmount}</TableCell>
                    </TableRow>
                ))}
                {(instruction.instructionNo && (instruction.progressStatus == 'STANDBY')) ? (
                    <TableRow>
                      <TableCell align="center">
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{width: '99%'}}>
                            {instruction.customerName}
                          </div>
                          <div style={{width: '1%'}}>
                            <EditButton onClick={changeCustomerModalStatus}/>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        <EditInput type='date' defaultValue={instruction.instructionDate}
                                   onChange={(e) => {
                                     this.updateInstruction({instructionDate: e.target.value});
                                   }}/>
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        <EditInput type='date' defaultValue={instruction.expirationDate}
                                   onChange={(e) => {
                                     this.updateInstruction({expirationDate: e.target.value});
                                   }}/>
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        <AddItemButton onClick={changeProductModalStatus}/>
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}></TableCell>
                      <TableCell align="center" style={tableCellStyle}></TableCell>
                      <TableCell align="center" style={tableCellStyle}></TableCell>
                      <TableCell align="center" style={tableCellStyle}></TableCell>
                    </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{textAlign: 'center'}}>
            <React.Fragment>
              {productModalOpen ? (
                  <ProductModal onClose={changeProductModalStatus}
                                addInstructionProduct={this.addInstructionProduct}/>
              ) : null}
              {customerModalOpen ? (
                  <CustomerModal onClose={changeCustomerModalStatus}
                                 setCustomer={(customerNo: number, customerName: string) => {
                                   this.updateInstruction({customerNo: customerNo});
                                 }}/>
              ) : null}
            </React.Fragment>
          </div>
        </>
    );
  }
}

export default ViewInstructionTable;