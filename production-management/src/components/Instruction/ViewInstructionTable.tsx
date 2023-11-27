import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {InstructionsState, UpdateInstruction} from "../../object/Instruction/Instruction-object";

import "./../../assets/css/Table.css";
import ProductModal from "../Modal/Product/ProductModal";
import CustomerModal from "../Modal/Product/CustomerModal";
import {AddProductInstruction} from "../../object/ProductInstruction/product-instruction-object";

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5'
};

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
            width: '100%',
            height: '30px',
            marginLeft: '2px',
            display: 'flex',
          }}>
            <div style={{width: '95%'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={require('./../../images/icon/detail.png')} style={{width: '20px'}}/>
                <span className='table-header'
                      style={{fontWeight: 'bold', fontSize: '16px'}}> 지시 상세 </span>
                {instruction.instructionNo ?
                    <span className={instruction.progressStatus} style={{width: '130px',marginLeft:'10px'}}>
                        {instruction.instructionNo}
                      </span>
                    : null}
              </div>
            </div>
            <div style={{width: '5%', textAlign: 'right'}}>
              {instruction.progressStatus == 'STANDBY' &&
                  <img src={require('../../images/button/delete-button.png')}
                       style={{width: '20px', marginRight: '10px', marginTop: '6px'}}
                       className='cellHoverEffect'
                       onClick={() => deleteInstruction(instruction.instructionNo)}/>}
            </div>
          </div>
          <TableContainer className='table-container' style={{
            height: this.props.tableSize ? '17.8%' : '65%',
            transition: 'height 0.3s ease-in-out'
          }}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>거래처 명</TableCell>
                  <TableCell align="center" style={boldCellStyle}>시작일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>종료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>상품 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>상품 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>상품 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>갯수</TableCell>
                  <TableCell align="center" style={boldCellStyle}>잔량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.length > 0 && list.map((row) => (
                    <TableRow>
                      <TableCell align="center">{instruction.customerName}</TableCell>
                      <TableCell align="center">{instruction.instructionDate}</TableCell>
                      <TableCell align="center">{instruction.expirationDate}</TableCell>
                      <TableCell align="center">{row.productNo}</TableCell>
                      <TableCell align="center">{row.productCode}</TableCell>
                      <TableCell align="center">{row.productName} </TableCell>
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
                                    <img
                                        src={require(`../../images/button/modify-button-black.png`)}
                                        className='cellHoverEffect'
                                        style={{width: '15px', verticalAlign: 'middle'}}
                                        onClick={changeAmountStatus}/> : null}
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
                            <img src={require(`../../images/button/modify-button-black.png`)}
                                 className='cellHoverEffect'
                                 style={{width: '15px', verticalAlign: 'middle'}}
                                 onClick={changeCustomerModalStatus}/>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center"><input type='date'
                                                       style={{
                                                         width: '100%',
                                                         height: '100%',
                                                         textAlign: 'center',
                                                         border: 0,
                                                         fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                                         fontWeight: 400,
                                                         fontSize: '0.875rem',
                                                         marginLeft: '9px'
                                                       }}
                                                       defaultValue={instruction.instructionDate}
                                                       onChange={(event => {
                                                         this.updateInstruction({instructionDate: event.target.value});
                                                       })}></input></TableCell>
                      <TableCell align="center"><input type='date'
                                                       style={{
                                                         width: '100%',
                                                         height: '100%',
                                                         textAlign: 'center',
                                                         border: 0,
                                                         fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                                         fontWeight: 400,
                                                         fontSize: '0.875rem',
                                                         marginLeft: '9px'
                                                       }}
                                                       defaultValue={instruction.expirationDate}
                                                       onChange={(event => {
                                                         this.updateInstruction({expirationDate: event.target.value});
                                                       })}/>
                      </TableCell>
                      <TableCell align="center">
                        <img src={require(`../../images/button/add-item-button-black.png`)}
                             className='cellHoverEffect'
                             style={{width: '15px', verticalAlign: 'middle'}}
                             onClick={changeProductModalStatus}/>
                      </TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
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