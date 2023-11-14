import React, {Component} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {
  AddInstructionProduct,
  InstructionsState
} from "../../object/Instruction/Instruction-object";
import ProductModal from "../Modal/Product/ProductModal";

import "./../../assets/css/Table.css";

type State = {
  productModalOpen: boolean,
  customerModalOpen: boolean,
  product: AddInstructionProduct[],
  customerNo: number
}

const boldCellStyle = {
  border: '1px solid #D3D3D3',
  fontWeight: 'bold',
  width: '10%',
};

const cellStyle = {
  border: '1px solid #D3D3D3',
  width: '10%',
};

class ViewInstructionTable extends Component<Props, State> {
  static contextType = InstructionsContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      productModalOpen: false,
      customerModalOpen: false,
      product: [],
      customerNo: 0
    } as State;
  }

  openProductModal = () => {
    this.setState({productModalOpen: true});
  }

  closeProductModal = () => {
    this.setState({productModalOpen: false});
  }

  addProducts = (addInstructionProduct: AddInstructionProduct) => {
    console.log('addProducts 호출');
    this.setState((prevState) => ({
      product: [...prevState.product, addInstructionProduct],
    }));
  }

  render() {
    const state = this.context as InstructionsState;
    const instruction = state.addInstruction;
    const {product} = this.state;

    return (
        <>
          <TableContainer className='table-container'>
            <Table size='small' className='table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 만료일</TableCell>
                  <TableCell align="center" style={boldCellStyle}>지시 상태</TableCell>
                  <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                  <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                  <TableCell align="center" style={boldCellStyle}>수량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.map((row) => (
                    <TableRow>
                      <TableCell align="center" style={cellStyle}></TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.instructionData}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.progressStatus}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.customerNo !== 0 ? instruction.customerNo : ''}
                      </TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{row.productCode}
                      </TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{row.amount}</TableCell>
                    </TableRow>
                ))}
                {instruction.customerNo ? (
                    <TableRow>
                      <TableCell align="center" style={cellStyle}></TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.instructionData}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.progressStatus}</TableCell>
                      <TableCell align="center"
                                 style={cellStyle}>{instruction.customerNo !== 0 ? instruction.customerNo : ''}
                      </TableCell>
                      <TableCell align="center" style={cellStyle}>
                        <button onClick={this.openProductModal}>품목</button>
                        <React.Fragment>
                          {this.state.productModalOpen ? (
                              <ProductModal onClose={this.closeProductModal}
                                            status={this.state.productModalOpen}
                                            addProduct={this.addProducts}/>
                          ) : null}
                        </React.Fragment>
                      </TableCell>
                      <TableCell align="center" style={cellStyle}></TableCell>
                    </TableRow>
                ): null}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    );
  }
}

export default ViewInstructionTable;