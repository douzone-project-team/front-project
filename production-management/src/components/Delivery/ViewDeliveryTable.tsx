import React, {Component} from "react";

import "../../assets/css/Table.css";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState, UpdateDelivery} from "../../object/Delivery/delivery-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {
    AddDeliveryInstruction,
    AddInstruction,
    AddProduct, DeleteDeliveryInstruction,
    UpdateDeliveryInstruction
} from "../../object/DeliveryInstruction/delivery-instruction-object";
import InstructionModal from "../Modal/Delivery/InstructionModal";
import DeliveryProductModal from "../Modal/Delivery/DeliveryProductModal";
import {InstructionsState} from "../../object/Instruction/Instruction-object";

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

type Props = {
    tableSize: boolean,
    instructionModalOpen: boolean,
    deliveryProductModalOpen: boolean,
    changeInstructionModalStatus: () => void,
    changeDeliveryProductModalStatus: () => void,
    changeAmount: boolean,
    changeAmountStatus: () => void,
}

type State = {
    newInstruction: {
        addDeliveryInstruction: AddInstruction
    }[],
    newProduct: {
        addDeliveryProduct: AddProduct
    }[]
    selectedInstructionNo: string,
}

class ViewDeliveryTable extends Component<Props, State>{
    static contextType = DeliveriesContext;

    constructor(props: Props) {
        super(props);
        this.state = {
            newInstruction: [],
            newProduct: [],
            selectedInstructionNo: '',
        }
    }

    updateDelivery = (newDeliveryDate: string)=> {
        const state = this.context as DeliveriesState;
        const delivery = state.delivery;
        const deliveryNo = state.delivery.deliveryNo;

        state.updateDelivery({deliveryNo, deliveryDate: newDeliveryDate});
    };

    // 한 가지 지시의 품목 amount 수정
    updateProductAmount = (instructionNo: string, amount: number, productNo: number) => {
        const state = this.context as DeliveriesState;
        const delivery = state.delivery;

        /* instruciton의 remainAmount 구하기
        * const remainAmount =  state.getRemainAmount(instructionNo, productNo);
        *
        * if(remainAmount < amount){
        *   alert('수량이 잔량보다 많습니다. <br/> 현재 잔량 : ' + remainingAmount);
        *   return;
        * */


        if(amount <= 0) {
            alert('수량을 올바르게 입력해주세요.');
            return;
        }

        const updateDeliveryInstruction = {
            deliveryNo: delivery.deliveryNo,
            instructionNo: instructionNo,
            productNo: productNo,
            amount: amount,
        } as UpdateDeliveryInstruction;

        state.updateDeliveryInstruction(updateDeliveryInstruction);
    };

    addInstruction = (instructionNo: string, instructionDate: string, expirationDate: string, customerName: string) => {
        const {newInstruction} = this.state;

        const addInstruction = {
            instructionNo,
            instructionDate,
            expirationDate,
            customerName,
        };

        this.setState({
            newInstruction: [{ addDeliveryInstruction: addInstruction }],
            selectedInstructionNo: instructionNo,
        })
    }

    addProduct =
        (instructionNo: string, productNo: number, productCode: string, amount: number, remainAmount: number) => {
        const {newProduct} = this.state;

        const addProduct = {
            addDeliveryProduct: {
                instructionNo: instructionNo,
                productNo: productNo,
                productCode: productCode,
                amount: amount,
                remainAmount: remainAmount,
            }
        };

        this.setState({
            newProduct: [addProduct],
        });

        this.addDeliveryInstruction(addProduct.addDeliveryProduct.instructionNo,
            addProduct.addDeliveryProduct.productNo,
            addProduct.addDeliveryProduct.amount);

    }

    addDeliveryInstruction = (instructionNo: string, productNo: number, amount: number) => {
        const state = this.context as DeliveriesState;
        const deliveryNo = state.delivery.deliveryNo;
        const addDelivery: AddDeliveryInstruction = {
            instructionNo,
            products: [{
                productNo,
                amount,
            }]
        };
        state.addDeliveryInstruction(deliveryNo, addDelivery);
        this.getDelivery();
    }

    getDelivery = () => {
        const state = this.context as DeliveriesState;
        const deliveryNo = state.delivery.deliveryNo;

        state.getDelivery(deliveryNo);
    }

    deleteDeliveryInstruction = (instructionNo: string, productNo: number) => {
        const state = this.context as DeliveriesState;

        const deleteDeliveryInstruction: DeleteDeliveryInstruction ={
            deliveryNo: state.delivery.deliveryNo,
            instructionNo: instructionNo,
            productNo: productNo,
        }

        state.deleteDeliveryInstruction(deleteDeliveryInstruction);
    }

    render() {
        const {delivery, deleteDelivery} = this.context as DeliveriesState;

        const list = delivery.instructions;
        const {
            changeInstructionModalStatus,
            changeDeliveryProductModalStatus,
            instructionModalOpen,
            deliveryProductModalOpen,
            changeAmount,
            changeAmountStatus
        } = this.props;

        return (
            <>
                <div style={{
                    width: '100%',
                    height: '30px',
                    marginBottom: '10px',
                    marginLeft: '2px',
                    display: 'flex',
                }}>
                    <div style={{width: '17%'}}>
                      <span className='table-header'>출고 상세 :&nbsp;
                        <span style={{color: '#0C70F2'}}>{delivery.deliveryNo}</span>
                      </span>
                    </div>
                    <div style={{width: '78%'}}>
                        {delivery.deliveryStatus === 'INCOMPLETE' ? (
                        <span className='table-header'>출고일 :&nbsp;
                            <input type="date"
                                   style={{height: '20px', color: '#0C70F2'}}
                                   defaultValue={delivery.deliveryDate}
                                   onChange={(e) => {
                                        this.updateDelivery(e.target.value);}}
                            />
                        </span>
                        ) : (
                            <span className='table-header'>출고일 : &nbsp;
                                <span style={{color: '#0C70F2'}}>{delivery.deliveryDate}</span>
                            </span>
                            )}
                    </div>
                    <div style={{width: '5%', textAlign: 'right'}}>
                        {delivery.deliveryStatus == 'INCOMPLETE' &&
                            <img src={require('../../images/button/delete-button.png')}
                                 style={{width: '20px', marginRight: '10px', marginTop: '6px'}}
                                 className='cellHoverEffect'
                                 onClick={() => deleteDelivery(delivery.deliveryNo)}/>}
                    </div>
                </div>
                        <TableContainer className='table-container' style={{
                            height: this.props.tableSize? '220px' : '460px',
                            transition: 'height 0.3s ease-in-out',
                        }}>
                            <Table size='small' className='table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>만료일</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>수량</TableCell>
                                        <TableCell align="center" style={boldCellStyle}>삭제</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list && list.length > 0 && list.map((row) => (
                                        <TableRow>
                                            <TableCell align="center" style={cellStyle}>{row.instructionNo}</TableCell>
                                            <TableCell align="center" style={cellStyle}>{row.customerName}</TableCell>
                                            <TableCell align="center"
                                                       style={cellStyle}>{row.instructionDate}</TableCell>
                                            <TableCell align="center" style={cellStyle}>{row.expirationDate}</TableCell>
                                            <TableCell align="center" style={cellStyle}>{row.productNo}</TableCell>
                                            <TableCell align="center" style={cellStyle}>{row.productCode}</TableCell>
                                            <TableCell align="center" style={cellStyle}>{row.productName}</TableCell>
                                            <TableCell align="center" style={cellStyle}>
                                                {!changeAmount ?
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                        <div style={{width: '99%'}}>
                                                            {row.amount}
                                                        </div>
                                                        <div style={{width: '1px'}}>
                                                            {delivery.deliveryStatus == 'INCOMPLETE' ?
                                                            <img src={require(`../../images/button/modify-button-black.png`)}
                                                                 className='cellHoverEffect'
                                                                 style={{width: '15px', verticalAlign: 'middle'}}
                                                                 onClick={changeAmountStatus}/> : null}
                                                        </div>
                                                    </div> :
                                                    <input type="number" defaultValue={row.amount}
                                                           onBlur={(e) => {
                                                            this.updateProductAmount(row.instructionNo, e.target.value as unknown as number, row.productNo);
                                                            changeAmountStatus();
                                                           }}/>
                                                }
                                            </TableCell>
                                                <TableCell align="center" style={cellStyle}>
                                                    {delivery.deliveryStatus == 'INCOMPLETE' ?
                                                    <img src={require(`../../images/button/delete-button.png`)}
                                                         style={{width: '15px', verticalAlign: 'middle'}}
                                                         onClick={() =>
                                                             this.deleteDeliveryInstruction(row.instructionNo, row.productNo)}
                                                    /> : null }
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                    {delivery.deliveryStatus == 'INCOMPLETE' ?
                                        (this.state.selectedInstructionNo ? (
                                            this.state.newInstruction.map((item, index) => (
                                                <TableRow key={index}>
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
                                                        {item.addDeliveryInstruction.customerName}
                                                    </TableCell>
                                                    <TableCell align="center" style={cellStyle}>
                                                        {item.addDeliveryInstruction.instructionDate}
                                                    </TableCell>
                                                    <TableCell align="center" style={cellStyle}>
                                                        {item.addDeliveryInstruction.expirationDate}
                                                    </TableCell>
                                                    <TableCell align="center" style={cellStyle}>
                                                        <img src={require(`../../images/button/add-item-button-black.png`)}
                                                             className='cellHoverEffect'
                                                             style={{width: '15px', verticalAlign:'middle'}}
                                                             onClick={changeDeliveryProductModalStatus}/>
                                                    </TableCell>
                                                    <TableCell align="center" style={cellStyle}></TableCell>
                                                    <TableCell align="center" style={cellStyle}></TableCell>
                                                    <TableCell align="center" style={cellStyle}></TableCell>
                                                    <TableCell align="center" style={cellStyle}></TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
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
                                                    <img src={require(`../../images/button/add-item-button-black.png`)}
                                                         className='cellHoverEffect'
                                                         style={{width: '15px', verticalAlign:'middle'}}
                                                         onClick={changeDeliveryProductModalStatus}/>
                                                </TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                                <TableCell align="center" style={cellStyle}></TableCell>
                                            </TableRow>
                                        )) : null }
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

export default ViewDeliveryTable;