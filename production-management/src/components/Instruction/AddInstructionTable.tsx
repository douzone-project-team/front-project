import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {
  AddInstructionProduct,
  InstructionsState,
  ProductInstruction,
  UpdateInstruction
} from "../../object/Instruction/Instruction-object";
import ProductModal from "../Modal/Instruction/ProductModal";
import CustomerModal from "../Modal/Instruction/CustomerModal";

import "./../../assets/css/Table.css";
import {AddProductInstruction} from "../../object/ProductInstruction/product-instruction-object";
import {AddItemButton} from "../../core/button/AddItemButton";
import {EditButton} from "../../core/button/EditButton";
import {EditInput} from "../../core/input/EditInput";

type State = {
  product: {
    addInstructionProduct: AddInstructionProduct
  }[],
}

type Props = {
  addSelectedCheckBox: (productNo: number) => void
  productModalOpen: boolean,
  customerModalOpen: boolean,
  changeProductModalStatus: () => void,
  changeCustomerModalStatus: () => void,
  existSelectedCheckBox: (productNo: number) => boolean,
}
const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light',
  minWidth: '170px',
  fontSize: '17px'
};

const tableCellStyle = {
  border: '1px solid #D3D3D3',
  fontFamily: 'S-CoreDream-3Light',
  minWidth: '170px',
  fontSize: '16px',
  maxHeight: '40px',
}

const addTableCellStyle = {
  border: '1px solid #D3D3D3',
  fontWeight: 'bold',
  fontFamily: 'S-CoreDream-3Light',
  minWidth: '170px',
  maxHeight: '40px',
  color: '#325FD2'
}

const statusMap = new Map([
  ['STANDBY', '준비'],
  ['PROGRESS', '진행중'],
  ['COMPLETED', '완료']
]);

class ViewInstructionTable extends Component<Props, State> {
  static contextType = InstructionsContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      product: [],
    } as State;
  }

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

  render() {
    const state = this.context as InstructionsState;
    const instruction = state.instruction;
    const {product} = this.state;
    const {
      addSelectedCheckBox,
      changeProductModalStatus,
      changeCustomerModalStatus,
      productModalOpen,
      customerModalOpen
    } = this.props;

    return (
        <>
          <TableContainer className='table-container' style={{height: '100%'}}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{
                    border: '1px solid #D3D3D3',
                    fontWeight: 'bold'
                  }}>
                    {instruction.products &&
                        <input
                            type="checkbox"
                            onChange={this.handleCheckboxAllChange}
                        />}
                  </TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 만료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>수량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instruction.products.map((row: ProductInstruction, index: number) => (
                    <TableRow key={row.productNo}>
                      <TableCell align="center" style={{
                        border: '1px solid #D3D3D3',
                        fontWeight: 'bold'
                      }}>
                        <input
                            type="checkbox"
                            checked={this.props.existSelectedCheckBox(row.productNo)}
                            onChange={() => addSelectedCheckBox(row.productNo)}
                        />
                      </TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.instructionNo}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.instructionDate}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.customerName}
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productNo}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productCode}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.productName}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{row.amount}</TableCell>
                    </TableRow>
                ))}
                {instruction.instructionNo ? (
                    <TableRow>
                      <TableCell align="center" style={{
                        border: '1px solid #D3D3D3',
                        fontWeight: 'bold'
                      }}>
                      </TableCell>
                      <TableCell align="center"
                                 style={addTableCellStyle}>{instruction.instructionNo}</TableCell>
                      <TableCell align="center"
                                 style={addTableCellStyle}>
                        <EditInput type='date'
                                   darkMode
                                   defaultValue={instruction.instructionDate}
                                   onChange={(e) => this.updateInstruction({instructionDate: e.target.value})}
                                   max={instruction.expirationDate}
                        />
                      </TableCell>
                      <TableCell align="center"
                                 style={addTableCellStyle}>
                        <EditInput type='date'
                                   darkMode
                                   defaultValue={instruction.expirationDate}
                                   onChange={(e) => this.updateInstruction({expirationDate: e.target.value})}
                                   min={instruction.instructionDate}
                        />
                      </TableCell>
                      <TableCell align="center"
                                 style={addTableCellStyle}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <span
                              style={{
                                marginLeft: '25px',
                                marginRight: '10px'
                              }}>{instruction.customerName}</span>
                          <EditButton color='black' size={15}
                                      onClick={changeCustomerModalStatus}/>
                        </div>
                      </TableCell>
                      <TableCell align="center" style={addTableCellStyle}>
                        <AddItemButton color='black' onClick={changeProductModalStatus}/>
                      </TableCell>
                      <TableCell align="center" style={addTableCellStyle}></TableCell>
                      <TableCell align="center" style={addTableCellStyle}></TableCell>
                      <TableCell align="center" style={addTableCellStyle}></TableCell>
                    </TableRow>
                ) : <tr>
                  <td colSpan={11} style={{textAlign: 'center'}}>
                    <img src={require('./../../images/null/instruction-null-image.png')}
                         style={{marginTop: '10%', width: '15%'}}/>
                  </td>
                </tr>}
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