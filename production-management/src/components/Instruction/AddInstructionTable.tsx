import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext} from "../../store/Instruction/Instructions-context";
import {
  AddInstructionProduct,
  InstructionsState,
  ProductInstruction
} from "../../object/Instruction/Instruction-object";
import ProductModal from "../Modal/Product/ProductModal";

import "./../../assets/css/Table.css";
import {AddProductInstruction} from "../../object/ProductInstruction/product-instruction-object";

type State = {
  productModalOpen: boolean,
  customerModalOpen: boolean,
  product: {
    addInstructionProduct: AddInstructionProduct
  }[],
  customerNo: number,
}

type Props = {
  addSelectedCheckBox : (productNo: number) => void
}

const boldCellStyle = {
  border: '1px solid #D3D3D3',
  fontWeight: 'bold',
};

const cellStyle = {
  border: '1px solid #D3D3D3',
};

class ViewInstructionTable extends Component<Props, State> {
  static contextType = InstructionsContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      productModalOpen: false,
      customerModalOpen: false,
      product: [],
      customerNo: 0,
    } as State;
  }

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
    const state = this.context as InstructionsState;
    const instruction = state.instruction;
    const {product} = this.state;
    const { addSelectedCheckBox } = this.props;

    return (
        <>
          <TableContainer className='table-container' style={{height: '300px'}}>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{
                    border: '1px solid #D3D3D3',
                    fontWeight: 'bold'
                  }}>
                  </TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 만료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 상태</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                  <TableCell align="center" style={boldCellStyle}>수량</TableCell>
                  <TableCell align="center" style={boldCellStyle}>잔량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instruction.products.map((row: ProductInstruction, index: number) => (
                    <TableRow>
                      <TableCell align="center" style={{
                        border: '1px solid #D3D3D3',
                        fontWeight: 'bold'
                      }}>
                        <input
                            type="checkbox"
                            onChange={() => addSelectedCheckBox(row.productNo)}
                        />
                      </TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.instructionNo}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.instructionDate}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.progressStatus}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.customerName !== null ? instruction.customerName : ''}
                      </TableCell>
                      <TableCell align="center" style={cellStyle}>{row.productNo}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.productCode}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.productName}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.amount}</TableCell>
                      <TableCell align="center" style={cellStyle}>{row.remainAmount}</TableCell>
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
                                 style={cellStyle}>{instruction.instructionNo}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.instructionDate}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.progressStatus}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.customerName !== null ? instruction.customerName : ''}
                      </TableCell>
                      <TableCell align="center" style={cellStyle}>
                        <img src={require(`../../images/add.png`)} style={{width: '10px'}}
                             onClick={() => this.setState({productModalOpen: true})}/>
                        <React.Fragment>
                          {this.state.productModalOpen ? (
                              <ProductModal onClose={() => this.setState({productModalOpen: false})}
                                            status={this.state.productModalOpen}
                                            addInstructionProduct={this.addInstructionProduct}/>
                          ) : null}
                        </React.Fragment>
                      </TableCell>
                      <TableCell align="center" style={cellStyle}></TableCell>
                      <TableCell align="center" style={cellStyle}></TableCell>
                      <TableCell align="center" style={cellStyle}></TableCell>
                      <TableCell align="center" style={cellStyle}></TableCell>
                    </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    );
  }
}

export default ViewInstructionTable;