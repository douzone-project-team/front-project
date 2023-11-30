import React, {Component} from "react";
import {AddProduct} from "../../../object/DeliveryInstruction/delivery-instruction-object";
import {InstructionsContext} from "../../../store/Instruction/Instructions-context";
import {Box} from "@material-ui/core";
import ViewDeliveryInstructionTable from "../../Delivery/ViewDeliveryInstructionTable";
import {DeliveriesContext} from "../../../store/Delivery/deliveries-context";

import './DeliveryProductModal.css';

type DeliveryProductModalProps = {
    onClose: () => void,
    addDeliveryProduct: (instructionNo: string, productNo: number, productCode: string, amount: number, remainAmount: number) => void,
    instructionNo: string,
};

type DeliveryProductModalState = {
    product: AddProduct,
    instructionNo: string,
};

class DeliveryProductModal extends Component<DeliveryProductModalProps, DeliveryProductModalState> {
    static deliveriesContextType = DeliveriesContext
    static contextType = InstructionsContext;

    constructor(props: DeliveryProductModalProps) {
        super(props);
        this.state = {
            product: {
                instructionNo: '',
                productNo: 0,
                productCode: '',
                amount: 0,
                remainAmount: 0,
            },
            instructionNo: props.instructionNo,
        };
    }

    setProduct = (product: AddProduct) => {
        this.setState({product: {...product, instructionNo: this.state.instructionNo}});
    }

    addDeliveryProduct = () => {
        const {onClose, addDeliveryProduct} = this.props
        const {product, instructionNo} = this.state;

        if (product.amount <= 0) {
            alert('수량을 올바르게 입력해주세요.');
            return;
        }

        if (product.amount > product.remainAmount) {
            alert('선택한 상품의 수량이 잔량보다 많습니다.')
            return;
        }

        addDeliveryProduct(instructionNo, product.productNo, product.productCode, product.amount, product.remainAmount);
        onClose();
    }

    handleAmountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const newAmount = parseInt(event.target.value, 10);
        this.setState((prevState) => ({
            product: {...prevState.product, amount: newAmount},
        }));
    }

    render() {
        const {onClose, instructionNo} = this.props;
        const {product} = this.state;

        return (
            <div className='dpModal'>
                <section>
                    <header>
                        <button className="close" onClick={onClose}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <ViewDeliveryInstructionTable instructionNo={instructionNo}
                                                      setProduct={this.setProduct}/>
                    </main>
                    {product.productNo !== 0 && (
                        <Box
                            sx={{
                                height: '100px',
                                border: '1.4px solid #D3D3D3',
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginLeft: '20px',
                                marginRight: '20px',
                                borderRadius: '10px',
                            }}
                        >
                            <Box sx={{mt: '20px'}}>
                                <label>
                                <span style={{
                                    marginRight: '10px',
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }}>상품 번호</span>
                                    <input type="text"
                                           style={{
                                               height: '20px',
                                               marginTop: '6px',
                                               marginRight: '10px',
                                               width: '50px',
                                               textAlign: 'center'
                                           }}
                                           readOnly
                                           value={this.state.product.productNo}
                                    />
                                </label>
                                <label>
                                <span style={{
                                    marginRight: '10px',
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }}>상품 코드</span>
                                    <input type="text"
                                           style={{
                                               height: '20px',
                                               marginTop: '6px',
                                               marginRight: '10px',
                                               width: '80px',
                                               textAlign: 'center'
                                           }}
                                           readOnly
                                           value={this.state.product.productCode}
                                    />
                                </label>
                                <label>
                                <span style={{
                                    marginRight: '10px',
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }}>수량</span>
                                    <input type="number" placeholder="수량"
                                           style={{
                                               height: '20px',
                                               marginTop: '6px',
                                               width: '50px',
                                               textAlign: 'center'
                                           }}
                                           onBlur={this.handleAmountBlur}
                                    />
                                </label>
                            </Box>
                            <button type='submit'
                                    style={{
                                        width: '50px',
                                        height: '27px',
                                        marginTop: '15px',
                                        borderRadius: '10px',
                                        backgroundColor: '#0C70F2',
                                        color: '#FFFFFF'
                                    }}
                                    onClick={this.addDeliveryProduct}>
                                등록
                            </button>
                        </Box>
                    )}
                </section>
            </div>
        );
    }
}

export default DeliveryProductModal;