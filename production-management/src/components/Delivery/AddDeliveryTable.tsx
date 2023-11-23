import React, {Component} from "react";
import {
    AddDeliveryInstruction,
    AddInstruction,
    AddProduct, DeleteDeliveryInstruction
} from "../../object/DeliveryInstruction/delivery-instruction-object";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import InstructionModal from "../Modal/Delivery/InstructionModal";
import DeliveryProductModal from "../Modal/Delivery/DeliveryProductModal";

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
    existSelectedCheckBox: (productNo: number) =>  boolean,
}

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
}

class AddDeliveryTable extends Component<Props, State>{
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
        const {instruction  } = this.state;

        const newInstruction = {
            instructionNo: instructionNo,
            instructionDate: instructionDate,
            expirationDate: expirationDate,
            customerName: customerName,
        };

        this.setState({
            instruction: [{ addDeliveryInstruction: newInstruction}],
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
        console.log('GET성공?');
    }

    deleteDeliveryInstruction = (instructionNo: string, productNo: number) => {
        const state = this.context as DeliveriesState;

        const deleteDeliveryInstruction : DeleteDeliveryInstruction ={
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
            changeInstructionModalStatus,
            changeDeliveryProductModalStatus,
            instructionModalOpen,
            deliveryProductModalOpen,
        } = this.props;

        return(
            <>
                <TableContainer className='table-container' style={{height: '300px'}}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={boldCellStyle}>출고 번호</TableCell>
                                <TableCell align='center' style={boldCellStyle}>지시 번호</TableCell>
                                <TableCell align='center' style={boldCellStyle}>지시일</TableCell>
                                <TableCell align='center' style={boldCellStyle}>지시 만료일</TableCell>
                                <TableCell align='center' style={boldCellStyle}>거래처</TableCell>
                                <TableCell align='center' style={boldCellStyle}>품목 코드</TableCell>
                                <TableCell align='center' style={boldCellStyle}>수량</TableCell>
                                <TableCell align='center' style={boldCellStyle}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {delivery.instructions.map((instruction, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" style={cellStyle}>{delivery.deliveryNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{instruction.instructionNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{instruction.instructionDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{instruction.expirationDate}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{instruction.customerName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{instruction.productCode}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{instruction.amount}</TableCell>
                                    <TableCell align="center" style={cellStyle}>
                                        <img src={require(`../../images/button/delete-button.png`)}
                                            style={{width: '15px', verticalAlign: 'middle'}}
                                             onClick={() =>
                                                this.deleteDeliveryInstruction(instruction.instructionNo, instruction.productNo)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {newDelivery.deliveryNo ? (
                                    this.state.selectedInstructionNo ? (
                                        instruction.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center" style={cellStyle}>
                                                    {newDelivery.deliveryNo}
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                        <div style={{width: '99%'}}>
                                                            {item.addDeliveryInstruction.instructionNo}
                                                        </div>
                                                        <div style={{width: '1%'}}>
                                                            <img src={require(`../../images/button/modify-button-black.png`)}
                                                                 className='cellHoverEffect'
                                                                 style={{width: '15px', verticalAlign: 'middle'}}
                                                                 onClick={changeInstructionModalStatus}/>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    {item.addDeliveryInstruction.instructionDate}
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    {item.addDeliveryInstruction.expirationDate}
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    {item.addDeliveryInstruction.customerName}
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    <img src={require(`../../images/button/add-item-button-black.png`)}
                                                         className='cellHoverEffect'
                                                         style={{width: '15px', verticalAlign:'middle'}}
                                                         onClick={changeDeliveryProductModalStatus}/>
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>

                                            </TableRow>
                                        ))
                                    ) : (
                                            <TableRow>
                                                <TableCell align="center" style={cellStyle}>
                                                    {newDelivery.deliveryNo}
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    <img src={require(`../../images/button/add-item-button-black.png`)}
                                                         className='cellHoverEffect'
                                                         style={{width: '15px', verticalAlign:'middle'}}
                                                         onClick={changeInstructionModalStatus}/>
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    {this.state.selectedInstructionNo ?
                                                        <img src={require(`../../images/button/add-item-button-black.png`)}
                                                             className='cellHoverEffect'
                                                             style={{width: '15px', verticalAlign:'middle'}}
                                                             onClick={changeDeliveryProductModalStatus}/>
                                                    : null }
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                            </TableRow>
                                        )
                            ) : null }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{textAlign: 'center'}}>
                    <React.Fragment>
                        {instructionModalOpen? (
                            <InstructionModal onClose={changeInstructionModalStatus}
                                              addDeliveryInstruction={this.addInstruction}/>
                        ) : null}
                        {deliveryProductModalOpen? (
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