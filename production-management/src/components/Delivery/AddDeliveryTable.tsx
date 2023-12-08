import React, {Component} from "react";
import {
  AddDeliveryInstruction,
  AddInstruction,
  AddProduct,
  DeleteDeliveryInstruction
} from "../../object/DeliveryInstruction/delivery-instruction-object";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import InstructionModal from "../Modal/Delivery/InstructionModal";
import DeliveryProductModal from "../Modal/Delivery/DeliveryProductModal";
import {AddButton} from "../../core/button/AddButton";
import {EditButton} from "../../core/button/EditButton";
import { AddItemButton } from "../../core/button/AddItemButton";

type State = {
  instruction: {
    addDeliveryInstruction: AddInstruction
  }[],
  product: {
    addDeliveryProduct: AddProduct
  }[],
  selectedInstructionNo: string,
}

type Props = {
  addSelectedCheckBox: (productNo: number) => void,
  instructionModalOpen: boolean,
  deliveryProductModalOpen: boolean,
  changeInstructionModalStatus: () => void,
  changeDeliveryProductModalStatus: () => void
  existSelectedCheckBox: (productNo: number) => boolean,
}

const boldCellStyle = {
  fontWeight: 'bold',
  backgroundColor: '#f1f3f5',
  fontFamily: 'S-CoreDream-3Light'
};

const tableCellStyle = {
  fontFamily: 'S-CoreDream-3Light'
}

class AddDeliveryTable extends Component<Props, State> {
  static contextType = DeliveriesContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      instruction: [],
      product: [],
      selectedInstructionNo: '',
    } as State;
  }

  addInstruction = (instructionNo: string, instructionDate: string, expirationDate: string, customerName: string) => {
    const {instruction} = this.state;

    const newInstruction = {
      instructionNo: instructionNo,
      instructionDate: instructionDate,
      expirationDate: expirationDate,
      customerName: customerName,
    };

    this.setState({
      instruction: [{addDeliveryInstruction: newInstruction}],
      selectedInstructionNo: instructionNo,
    })
  }


  addProduct = (instructionNo: string, productNo: number, productCode: string, amount: number, remainAmount: number) => {
    const {product} = this.state;

    const newProduct = {
      addDeliveryProduct: {
        instructionNo: instructionNo,
        productNo: productNo,
        productCode: productCode,
        amount: amount,
        remainAmount: remainAmount,
      }
    };

    this.setState({
      product: [newProduct],
    })

    this.addDeliveryInstruction(newProduct.addDeliveryProduct.instructionNo,
        newProduct.addDeliveryProduct.productNo,
        newProduct.addDeliveryProduct.amount);
  }

  addDeliveryInstruction = (instructionNo: string, productNo: number, amount: number) => {
    const state = this.context as DeliveriesState;
    const deliveryNo = state.newDelivery.deliveryNo;
    const addDelivery: AddDeliveryInstruction = {
      instructionNo: instructionNo,
      products: [{
        productNo: productNo,
        amount: amount
      }]
    }
    state.addDeliveryInstruction(deliveryNo, addDelivery);
    this.getDelivery();
  }

  getDelivery = () => {
    const state = this.context as DeliveriesState;
    const deliveryNo = state.newDelivery.deliveryNo;
    const delivery = state.delivery;

    state.getDelivery(deliveryNo);
  }

  deleteDeliveryInstruction = (instructionNo: string, productNo: number) => {
    const state = this.context as DeliveriesState;

    const deleteDeliveryInstruction: DeleteDeliveryInstruction = {
      deliveryNo: state.newDelivery.deliveryNo,
      instructionNo: instructionNo,
      productNo: productNo,
    }

    state.deleteDeliveryInstruction(deleteDeliveryInstruction);

  }

  render() {
    const state = this.context as DeliveriesState;
    const delivery = state.delivery;
    const newDelivery = state.newDelivery;
    const {instruction, product} = this.state;
    const {
      addSelectedCheckBox,
      changeInstructionModalStatus,
      changeDeliveryProductModalStatus,
      instructionModalOpen,
      deliveryProductModalOpen,
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
                  </TableCell>
                  <TableCell align='center' style={boldCellStyle}>출고 번호</TableCell>
                  <TableCell align='center' style={boldCellStyle}>지시 번호</TableCell>
                  <TableCell align='center' style={boldCellStyle}>지시일</TableCell>
                  <TableCell align='center' style={boldCellStyle}>지시 만료일</TableCell>
                  <TableCell align='center' style={boldCellStyle}>거래처</TableCell>
                  <TableCell align='center' style={boldCellStyle}>품목 코드</TableCell>
                  <TableCell align='center' style={boldCellStyle}>수량</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {delivery.instructions.map((instruction, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" style={{
                        border: '1px solid #D3D3D3',
                        fontWeight: 'bold'
                      }}>
                        <input
                            type="checkbox"
                            checked={this.props.existSelectedCheckBox(instruction.productNo)}
                            onChange={() => addSelectedCheckBox(instruction.productNo)}
                        />
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>{delivery.deliveryNo}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.instructionNo}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.instructionDate}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.expirationDate}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.customerName}</TableCell>
                      <TableCell align="center"
                                 style={tableCellStyle}>{instruction.productCode}</TableCell>
                      <TableCell align="center" style={tableCellStyle}>{instruction.amount}</TableCell>
                    </TableRow>
                ))}
                {newDelivery.deliveryNo ? (
                    this.state.selectedInstructionNo ? (
                        instruction.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell align="center" style={{
                                border: '1px solid #D3D3D3',
                                fontWeight: 'bold'
                              }}>
                              </TableCell>
                              <TableCell align="center" style={tableCellStyle}>
                                {newDelivery.deliveryNo}
                              </TableCell>
                              <TableCell align="center" style={tableCellStyle}>
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                  <div style={{width: '99%'}}>
                                    {item.addDeliveryInstruction.instructionNo}
                                  </div>
                                  <div style={{width: '1%'}}>
                                    <EditButton color="black"
                                                onClick={changeInstructionModalStatus}/>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="center" style={tableCellStyle}>
                                {item.addDeliveryInstruction.instructionDate}
                              </TableCell>
                              <TableCell align="center" style={tableCellStyle}>
                                {item.addDeliveryInstruction.expirationDate}
                              </TableCell>
                              <TableCell align="center" style={tableCellStyle}>
                                {item.addDeliveryInstruction.customerName}
                              </TableCell>
                              <TableCell align="center" style={tableCellStyle}>
                                <AddButton onClick={changeDeliveryProductModalStatus}/>
                              </TableCell>
                              <TableCell align="center" style={tableCellStyle}></TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                          <TableCell align="center" style={{
                            border: '1px solid #D3D3D3',
                            fontWeight: 'bold'
                          }}>
                          </TableCell>
                          <TableCell align="center" style={tableCellStyle}>
                            {newDelivery.deliveryNo}
                          </TableCell>
                          <TableCell align="center" style={tableCellStyle}>
                            <AddItemButton color="black"
                                 onClick={changeInstructionModalStatus}/>
                          </TableCell>
                          <TableCell align="center" style={tableCellStyle}></TableCell>
                          <TableCell align="center" style={tableCellStyle}></TableCell>
                          <TableCell align="center" style={tableCellStyle}></TableCell>
                          <TableCell align="center" style={tableCellStyle}>
                            {this.state.selectedInstructionNo ?
                                <AddItemButton color="black"
                                           onClick={changeDeliveryProductModalStatus}/>
                                : null}
                          </TableCell>
                          <TableCell align="center" style={tableCellStyle}></TableCell>
                        </TableRow>
                    )
                ) : <td colSpan={11} style={{textAlign: 'center'}}>
                  <img src={require('./../../images/null/delivery-null-image.png')}
                       style={{marginTop: '10%', width: '15%'}}/>
                </td>}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{textAlign: 'center'}}>
            <React.Fragment>
              {instructionModalOpen ? (
                  <InstructionModal onClose={changeInstructionModalStatus}
                                    addDeliveryInstruction={this.addInstruction}/>
              ) : null}
              {deliveryProductModalOpen ? (
                  <DeliveryProductModal onClose={changeDeliveryProductModalStatus}
                                        addDeliveryProduct={this.addProduct}
                                        instructionNo={this.state.selectedInstructionNo}/>
              ) : null}
            </React.Fragment>
          </div>
        </>
    );
  }
}

export default AddDeliveryTable;