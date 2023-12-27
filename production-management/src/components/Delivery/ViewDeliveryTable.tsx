import React, {Component} from "react";

import "../../assets/css/Table.css";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState, Instructions} from "../../object/Delivery/delivery-object";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {
    AddDeliveryInstruction,
    AddInstruction,
    AddProduct,
    DeleteDeliveryInstruction,
    UpdateDeliveryInstruction
} from "../../object/DeliveryInstruction/delivery-instruction-object";
import InstructionModal from "../Modal/Delivery/InstructionModal";
import DeliveryProductModal from "../Modal/Delivery/DeliveryProductModal";
import {DetailTitle} from "../../core/DetailTitle";
import {DeleteButton} from "../../core/button/DeleteButton";
import {CheckButton} from "../../core/button/CheckButton";
import Swal from "sweetalert2";
import {AddItemButton} from "../../core/button/AddItemButton";
import {EditButton} from "../../core/button/EditButton";
import { EmptyText } from "../../core/EmptyText";
import {DateInput} from "../../core/input/DateInput";

const boldCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f1f3f5',
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '17px'
};

const tableCellStyle = {
    fontFamily: 'S-CoreDream-3Light',
    minWidth: '170px',
    fontSize: '16px'
}

type Props = {
    tableSize: boolean,
    instructionModalOpen: boolean,
    deliveryProductModalOpen: boolean,
    changeInstructionModalStatus: () => void,
    changeDeliveryProductModalStatus: () => void,
    changeAmount: boolean,
    changeTarget: number,
    changeTargetNumber: (target: number) => void,
    changeAmountStatus: () => void,
    tableSizeUp: () => void,
    existSelectedCheckBox: (productNo: number) => boolean,
    addSelectedCheckBox: (productNo: number) => void,
    clearCheckBoxes: () => void,
    delivery: DeliveriesState['delivery'];
}

type State = {
    newInstruction: {
        addDeliveryInstruction: AddInstruction
    }[],
    newProduct: {
        addDeliveryProduct: AddProduct
    }[]
    selectedInstructionNo: string,
    changeValue: number,
}

class ViewDeliveryTable extends Component<Props, State> {
    static contextType = DeliveriesContext;

    constructor(props: Props) {
        super(props);
        this.state = {
            newInstruction: [],
            newProduct: [],
            selectedInstructionNo: '',
            changeValue: 0,
        }
    }

    componentDidMount() {
        const state = this.context as DeliveriesState;
        state.getDeliveryList();
        const list = state.deliveryPage?.list;
        if (list.length > 0) {
            const firstDelivery = list && list.length > 0 ? list[0] : null;
            if (firstDelivery) {
                state.getDelivery(firstDelivery?.deliveryNo);
            }
        }
    }

    componentDidUpdate(prevProps: Props) {
        const { delivery } = this.context as DeliveriesState;

        if (prevProps.delivery.deliveryNo !== delivery.deliveryNo) {
            // Reset selectedInstructionNo when the deliveryNo changes
            this.setState({
                selectedInstructionNo: '',
            });
        }
    }

    handleCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {existSelectedCheckBox, addSelectedCheckBox} = this.props;
        const state = this.context as DeliveriesState;
        const delivery = state.delivery;

        if (event.target.checked) {
            delivery.instructions.forEach((instruction: Instructions) => {
                if (!existSelectedCheckBox(instruction.productNo)) {
                    addSelectedCheckBox(instruction.productNo);
                }
            });
        } else {
            delivery.instructions.forEach((instruction: Instructions) => {
                if (existSelectedCheckBox(instruction.productNo)) {
                    addSelectedCheckBox(instruction.productNo);
                }
            });
        }
    };

    updateProductButtonClickEvent = (instructionNo: string, productNo: number, amount: number) => {
        const state = this.context as DeliveriesState;

        if (!/^\d+$/.test(this.state.changeValue as unknown as string)) {
            Swal.fire({
                icon: "warning",
                text: "숫자만 입력해주세요."
            });
        } else {
            Swal.fire({
                icon: "success",
                text: "수량을 수정하였습니다.",
                showConfirmButton: false,
                timer: 1000
            });
            const {changeAmountStatus} = this.props;
            state.getRemainAmount(instructionNo, productNo);
            this.updateProductAmount(instructionNo, this.state.changeValue, productNo, amount);
            changeAmountStatus();
        }
    }

    deleteDeliveryButtonClickEvent = () => {
        const {delivery, deleteDelivery} = this.context as DeliveriesState;
        const {tableSize, tableSizeUp, clearCheckBoxes} = this.props;

        Swal.fire({
            title: "정말 삭제하시겠습니까?",
            text: "삭제 후 복구할 수 없습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            reverseButtons: true,
            focusCancel: true
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }
            Swal.fire({
                icon: 'success',
                text: '출고가 삭제 되었습니다.',
                showConfirmButton: false,
                timer: 1000
            })

            clearCheckBoxes();
            deleteDelivery(delivery.deliveryNo);
            if (!tableSize) {
                tableSizeUp();
            }
        })
    }

    editProductCountButtonClickEvent = (row: Instructions) => {
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

    updateDelivery = (newDeliveryDate: string) => {
        const state = this.context as DeliveriesState;
        const delivery = state.delivery;
        const deliveryNo = state.delivery.deliveryNo;

        state.updateDelivery({deliveryNo, deliveryDate: newDeliveryDate});
        Swal.fire({
            icon: "success",
            text: "출고일이 변경되었습니다.",
            showConfirmButton: false,
            timer: 1000
        });
        this.getDelivery();
        this.getDeliveryList();
    };

    updateDeliveryStatusButtonClick = (deliveryNo: string) => {
        const state = this.context as DeliveriesState;
        const delivery = state.delivery;

        Swal.fire({
            title: "출고를 완료하시겠습니까?",
            text: "출고의 상태가 미완료에서 완료로 업데이트 됩니다. ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "완료",
            cancelButtonText: "취소",
            reverseButtons: true,
            focusCancel: true
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }
            state.updateDeliveryStatus(deliveryNo);
        });
    }

    getRemainAmount = (instructionNo: string, productNo: number) => {
        const state = this.context as DeliveriesState;
        state.getRemainAmount(instructionNo, productNo);
    }

    // 한 가지 지시의 품목 amount 수정
    updateProductAmount = (instructionNo: string, amount: number, productNo: number, prevAmount: number) => {
        const state = this.context as DeliveriesState;
        const delivery = state.delivery;
        const remainAmount = state.remainAmount.remainAmount;

        if (amount > remainAmount + prevAmount) {
            Swal.fire({
                icon: "warning",
                text: `수량이 잔량보다 많습니다. \n현재 잔량 :  ${remainAmount + prevAmount}`
            });
            return;
        }

        if (amount <= 0) {
            Swal.fire({
                icon: "warning",
                text: '수량을 올바르게 입력해주세요.'
            });
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
            newInstruction: [{addDeliveryInstruction: addInstruction}],
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

    getDeliveryList = () => {
        const state = this.context as DeliveriesState;
        state.getDeliveryList();
    }

    deleteDeliveryInstruction = (instructionNo: string, productNo: number) => {
        const state = this.context as DeliveriesState;

        const deleteDeliveryInstruction: DeleteDeliveryInstruction = {
            deliveryNo: state.delivery.deliveryNo,
            instructionNo: instructionNo,
            productNo: productNo,
        }

        state.deleteDeliveryInstruction(deleteDeliveryInstruction);
    }


    render() {
        const {delivery, updateDeliveryStatus, deleteDelivery} = this.context as DeliveriesState;

        const list = delivery.instructions;
        const {
            tableSize,
            changeInstructionModalStatus,
            changeDeliveryProductModalStatus,
            instructionModalOpen,
            deliveryProductModalOpen,
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
                    height: '30px',
                }}>
                    <div style={{width: '30%'}}>
                        <DetailTitle options={{
                            status: delivery.deliveryStatus,
                            targetName: delivery.deliveryNo as string,
                            title: '출고 상세'
                        }}/>
                    </div>
                    <div style={{width: '64%', height: '16px', display: 'flex', alignItems: 'center'}}>
                        {delivery.deliveryStatus === 'INCOMPLETE' ? (
                            <span className='table-header'
                                  style={{fontWeight: 'bold', fontSize: '16px'}}>출고일 :&nbsp;
                                <input type="date"
                                       style={{height: '30px', color: '#0C70F2',
                                       background: `url(${require('../../images/button/date-button.png')}) no-repeat right 5px center / 16px auto`}}
                                       defaultValue={delivery.deliveryDate}
                                       onChange={(e) => {
                                           this.updateDelivery(e.target.value);
                                       }}
                                />
                        </span>
                        ) : (
                            <span className='table-header' style={{fontWeight: 'bold', fontSize: '16px'}}>출고일 : &nbsp;
                                <span style={{color: '#0C70F2'}}>{delivery.deliveryDate}</span>
                            </span>
                        )}
                    </div>
                    <div style={{width: '8%', height: '16px', alignItems: 'center', textAlign: 'right'}}>
                        {delivery.deliveryStatus == 'INCOMPLETE' &&
                            <div>
                                <CheckButton size={23} onClick={() =>
                                    this.updateDeliveryStatusButtonClick(delivery.deliveryNo)} />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <DeleteButton size={22} onClick={() => this.deleteDeliveryButtonClickEvent()} />
                            </div>}
                    </div>
                </div>
                <TableContainer className='table-container' style={{
                    height: this.props.tableSize ? '17.8%' : '65%',
                    transition: 'height 0.3s ease-in-out',
                }}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                {delivery.deliveryStatus == 'INCOMPLETE' &&
                                    <TableCell align="center" style={boldCellStyle}>
                                        <input
                                            type="checkbox"
                                            onChange={this.handleCheckboxAllChange}
                                        />
                                    </TableCell>}
                                <TableCell align="center" style={boldCellStyle}>지시 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>거래처</TableCell>
                                <TableCell align="center" style={boldCellStyle}>지시일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>만료일</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>수량</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list && list.length > 0 ? list.map((row) => (
                                    <TableRow key={row.instructionNo}>
                                        {delivery.deliveryStatus == 'INCOMPLETE' &&
                                            <TableCell align="center" style={tableCellStyle}>
                                                <input
                                                    type="checkbox"
                                                    checked={this.props.existSelectedCheckBox(row.productNo)}
                                                    onChange={() => addSelectedCheckBox(row.productNo)}
                                                />
                                            </TableCell>}
                                        <TableCell align="center" style={tableCellStyle}>{row.instructionNo}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>{row.customerName}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>{row.instructionDate}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>{row.expirationDate}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>{row.productNo}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>{row.productCode}</TableCell>
                                        <TableCell align="center" style={tableCellStyle}>{row.productName}</TableCell>
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
                                                    <div style={{width: '1px'}}>
                                                        {delivery.deliveryStatus == 'INCOMPLETE' ?
                                                            <EditButton
                                                                color="black"
                                                                onClick={() => {
                                                                    this.editProductCountButtonClickEvent(row)
                                                                    this.getRemainAmount(row.instructionNo, row.productNo);
                                                                }}
                                                            />
                                                            : null
                                                        }
                                                    </div>
                                                </div> :
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <div style={{width: '99%'}}>
                                                        <input type="number" defaultValue={row.amount}
                                                               onChange={(e) => {
                                                                   this.setState({changeValue: e.target.value as unknown as number});
                                                               }}
                                                               style={{width: '68px'}}
                                                        />
                                                    </div>
                                                    <div style={{width: '1%'}}>
                                                        <EditButton
                                                            onClick={() => {
                                                                this.updateProductButtonClickEvent(row.instructionNo, row.productNo, row.amount);
                                                            }}
                                                        />

                                                    </div>
                                                </div>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )) : delivery.deliveryNo ? null :
                                <TableRow>
                                    <TableCell colSpan={9} style={{borderTop: '0', borderRight: '0', borderLeft: '0'}}>
                                        <EmptyText mt='0' />
                                    </TableCell>
                                </TableRow>
                            }
                            {delivery.deliveryStatus == 'INCOMPLETE' ?
                                (this.state.selectedInstructionNo ? (
                                    this.state.newInstruction.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" style={tableCellStyle}>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    ...tableCellStyle
                                                }}>
                                                    <div style={{width: '99%'}}>
                                                        {item.addDeliveryInstruction.instructionNo}
                                                    </div>
                                                    <div style={{width: '1%'}}>
                                                        <EditButton size={18} onClick={changeInstructionModalStatus}/>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="center" style={tableCellStyle}>
                                                {item.addDeliveryInstruction.customerName}
                                            </TableCell>
                                            <TableCell align="center" style={tableCellStyle}>
                                                {item.addDeliveryInstruction.instructionDate}
                                            </TableCell>
                                            <TableCell align="center" style={tableCellStyle}>
                                                {item.addDeliveryInstruction.expirationDate}
                                            </TableCell>
                                            <TableCell align="center" style={tableCellStyle}>
                                                <AddItemButton mt='3px' size={18}
                                                               onClick={changeDeliveryProductModalStatus}/>
                                            </TableCell>
                                            <TableCell align="center" style={tableCellStyle}></TableCell>
                                            <TableCell align="center" style={tableCellStyle}></TableCell>
                                            <TableCell align="center" style={tableCellStyle}></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align="center" style={tableCellStyle}>
                                        </TableCell>
                                        <TableCell align="center">
                                            <AddItemButton mt="3px" size={18} onClick={changeInstructionModalStatus}/>
                                        </TableCell>
                                        <TableCell align="center" style={tableCellStyle}></TableCell>
                                        <TableCell align="center" style={tableCellStyle}></TableCell>
                                        <TableCell align="center" style={tableCellStyle}></TableCell>
                                        <TableCell align="center" style={tableCellStyle}>
                                            {this.state.selectedInstructionNo ? (
                                                <AddItemButton mt='3px' size={18}
                                                               onClick={changeDeliveryProductModalStatus}/>
                                            ) : null}
                                        </TableCell>
                                        <TableCell align="center" style={tableCellStyle}></TableCell>
                                        <TableCell align="center" style={tableCellStyle}></TableCell>
                                        <TableCell align="center" style={tableCellStyle}></TableCell>
                                    </TableRow>
                                )) : null}
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

export default ViewDeliveryTable;