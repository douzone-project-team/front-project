import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {
  InstructionsState,
  ProductInstruction,
  UpdateInstruction
} from "../../object/Instruction/Instruction-object";

import "./../../assets/css/Table.css";
import ProductModal from "../Modal/Instruction/ProductModal";
import CustomerModal from "../Modal/Instruction/CustomerModal";
import {AddProductInstruction} from "../../object/ProductInstruction/product-instruction-object";
import {DetailTitle} from "../../core/DetailTitle";
import {DeleteButton} from "../../core/button/DeleteButton";
import {AddItemButton} from "../../core/button/AddItemButton";
import {EditButton} from "../../core/button/EditButton";
import {EditInput} from "../../core/input/EditInput";
import {EmptyText} from "../../core/EmptyText";
import Swal from 'sweetalert2';

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light',
  minWidth: '100px'
};

const tableCellStyle = {
  fontFamily: 'S-CoreDream-3Light',
  minWidth: '100px'
}

type Props = {
  tableSize: boolean,
  productModalOpen: boolean,
  customerModalOpen: boolean,
  changeProductModalStatus: () => void,
  changeCustomerModalStatus: () => void,
  changeAmount: boolean,
  changeTarget: number,
  changeTargetNumber: (target: number) => void,
  changeAmountStatus: () => void,
  tableSizeUp: () => void,
  existSelectedCheckBox: (productNo: number) => boolean,
  addSelectedCheckBox: (productNo: number) => void,
  clearCheckBoxs: () => void,
}

type State = {
  changeValue: number;
}

class ViewInstructionTable extends Component<Props, State> {

  static contextType = InstructionsContext;

  handleCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {existSelectedCheckBox, addSelectedCheckBox} = this.props;
    const state = this.context as InstructionsState;
    const instruction = state.instruction;

    if (event.target.checked) {
      instruction.products.forEach((row: ProductInstruction) => {
        if (!existSelectedCheckBox(row.productNo)) {
          addSelectedCheckBox(row.productNo);
        }
      });
    } else {
      instruction.products.forEach((row: ProductInstruction) => {
        if (existSelectedCheckBox(row.productNo)) {
          addSelectedCheckBox(row.productNo);
        }
      });
    }
  };

  updateProductButtonClickEvent = (productNo: number) => {
    console.log(this.state.changeValue);
    if (!/^\d+$/.test(this.state.changeValue as unknown as string)) {
      Swal.fire({
        icon: "warning",
        text: "숫자만 입력해주세요."
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "갯수를 수정하였습니다.",
        showConfirmButton: false,
        timer: 1000
      });
      const {changeAmountStatus} = this.props;
      this.updateProduct(this.state.changeValue, productNo);
      changeAmountStatus();
    }
  }

  deleteInstructionButtonClickEvent = () => {
    const {instruction, deleteInstruction} = this.context as InstructionsState;
    const {tableSize, tableSizeUp, clearCheckBoxs} = this.props;

    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제 후 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then(() => {
      clearCheckBoxs();
      deleteInstruction(instruction.instructionNo);
      if (!tableSize) {
        tableSizeUp();
      }
    })
  }

  editProductCountButtonClickEvent = (row: ProductInstruction) => {
    const {changeAmountStatus, changeAmount, changeTargetNumber} = this.props;
    if (changeAmount) {
      this.setState({changeValue: row.amount});
      changeTargetNumber(row.productNo);
    } else {
      this.setState({changeValue: row.amount});
      changeTargetNumber(row.productNo);
      changeAmountStatus();
    }
  }


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
      tableSize,
      changeProductModalStatus,
      changeCustomerModalStatus,
      productModalOpen,
      customerModalOpen,
      changeTarget,
      changeAmount,
      changeTargetNumber,
      tableSizeUp,
      addSelectedCheckBox,
      existSelectedCheckBox
    } = this.props;

    return (
        <>
          <div style={{
            display: 'flex',
            height: '30px'
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
                  <DeleteButton size={22} onClick={() => this.deleteInstructionButtonClickEvent()}/>}
            </div>
          </div>
          <TableContainer className='table-container' style={{
            height: tableSize ? '17.8%' : '65%',
            transition: 'height 0.3s ease-in-out'
          }}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  {instruction.progressStatus == 'STANDBY' &&
                      <TableCell align="center" style={boldCellStyle}>
                        <input
                            type="checkbox"
                            onChange={this.handleCheckboxAllChange}
                        />
                      </TableCell>}
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
                {list && list.length > 0 ? list.map((row) => (
                    <TableRow key={row.productNo}>
                      {instruction.progressStatus == 'STANDBY' &&
                          <TableCell align="center"
                                     style={tableCellStyle}>
                            <input
                                type="checkbox"
                                checked={this.props.existSelectedCheckBox(row.productNo)}
                                onChange={() => addSelectedCheckBox(row.productNo)}
                            />
                          </TableCell>
                      }
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.customerName}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.instructionDate}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productNo}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productCode}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{row.productName} </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        {row.productNo !== changeTarget || !changeAmount ?
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
                                    <EditButton
                                        color="black"
                                        onClick={() => this.editProductCountButtonClickEvent(row)}/> : null}
                              </div>
                            </div> :
                            <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                              <div style={{width: '99%'}}>
                                <input type='text' defaultValue={row.amount}
                                       onChange={(e) => {
                                         this.setState({changeValue: e.target.value as unknown as number});
                                       }}
                                       style={{width: '68px'}}
                                />
                              </div>
                              <div style={{width: '1%'}}>
                                <EditButton
                                    onClick={() => this.updateProductButtonClickEvent(row.productNo)}/>
                              </div>
                            </div>
                        }
                      </TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{row.remainAmount}</TableCell>
                    </TableRow>
                )) : instruction.instructionNo ? null : <TableRow>
                  <TableCell colSpan={8} style={{border: '0'}}>
                    <EmptyText mt={'0px'}/>
                  </TableCell>
                </TableRow>}
                {(instruction.instructionNo && (instruction.progressStatus == 'STANDBY')) ? (
                    <TableRow>
                      <TableCell align="center" style={tableCellStyle}/>
                      <TableCell style={tableCellStyle} align="center">
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                          <div style={{width: '99%'}}>
                            {instruction.customerName}
                          </div>
                          <div style={{width: '1%'}}>
                            <EditButton size={18} onClick={changeCustomerModalStatus}/>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        <EditInput type='date' defaultValue={instruction.instructionDate}
                                   onChange={(e) => {
                                     this.updateInstruction({instructionDate: e.target.value});
                                   }} max={instruction.expirationDate}
                        />
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        <EditInput type='date' defaultValue={instruction.expirationDate}
                                   onChange={(e) => {
                                     this.updateInstruction({expirationDate: e.target.value});
                                   }} min={instruction.instructionDate}
                        />
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        <AddItemButton mt='3px' size={18} onClick={changeProductModalStatus}/>
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