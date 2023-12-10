import {Component} from "react";
import {CustomersState, InsertCustomer} from "../../../object/Customer/customer-object";
import {CustomersContext} from "../../../store/Customer/customers-context";
import {Box} from "@material-ui/core";
import './CustomerModalCss.css'
import BusinessIcon from "@material-ui/icons/Business";

type CustomerModalProps = {
    onClose: () => void,
    status: boolean,
    updateCustomer: (customerNo: number, customerName: string, customerTel: string, ceo: string) => void
    customerNo: number
}

type CustomerModalState = {
    customer: InsertCustomer
    setCustomer: (customer: InsertCustomer) => void
    updateCustomer: () => void
}

let modifyValue = {
    customerName: '',
    customerTel1: '',
    customerTel2: '',
    customerTel3: '',
    ceo: '',
}

export class CustomerModifyModal extends Component<CustomerModalProps, CustomerModalState> {
    static contextType = CustomersContext;
    componentDidMount() {
        const state = this.context as CustomersState;
        state.getCustomer(this.props.customerNo);
    }

    constructor(props: CustomerModalProps) {
        super(props);
        this.state = {
            customer: {
                customerCode: '',
                customerName: '',
                customerTel: '',
                ceo: '',
                sector: ''
            },

            setCustomer: (customer: InsertCustomer) => {
                this.setState({customer: customer});
            },

            updateCustomer: () => {
                const customerTel = modifyValue.customerTel1+"-"+modifyValue.customerTel2+"-"+modifyValue.customerTel3;
                const state = this.context as CustomersState;
                const {onClose, updateCustomer} = this.props as CustomerModalProps;
                if(modifyValue.customerName === state.customer.customerName && customerTel === state.customer.customerTel && modifyValue.ceo === state.customer.ceo){
                    onClose();
                    return;
                }
                updateCustomer(this.props.customerNo, modifyValue.customerName, customerTel, modifyValue.ceo);
                onClose();
            }
        }


    }

    render() {
        const state = this.context as CustomersState;
        const {onClose, status} = this.props as CustomerModalProps;
        const customer = state.customer;
        const customerTel = customer.customerTel;
        const customerTelArray = customerTel.split("-");
        modifyValue.customerName = customer.customerName;
        modifyValue.customerTel1 = customerTelArray[0];
        modifyValue.customerTel2 = customerTelArray[1];
        modifyValue.customerTel3 = customerTelArray[2];
        modifyValue.ceo = customer.ceo;
        return (
            <div className='modal'>
                <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width:'450px', height: '600px'}}>
                    <div className="modalHeader" style={{height: '55px'}}>
                        <div style={{display: 'flex'}}><BusinessIcon/>&nbsp;거래처 수정</div>
                        <button className="close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <main className="customer-modal-main" style={{border: "none", display: 'grid', placeItems: 'center'}}>
                        <Box
                            sx={{
                                width : '95%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '8px',
                            }}
                        >
                            <label className="form-label">
                                거래처 번호
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                className="form-input"
                                value={customer.customerNo}
                                disabled
                            />
                            <label className="form-label">
                                거래처 코드
                            </label>
                            <div style={{display:'flex'}}>
                                <input
                                    type="text"
                                    placeholder="ex) C0001"
                                    className="form-input"
                                    value={customer.customerCode}
                                    disabled
                                />
                            </div>
                            <label className="form-label">
                                거래처 명칭
                            </label>
                            <input
                                type="text"
                                placeholder="ex) 더존비즈온"
                                className="form-input"
                                defaultValue={customer.customerName}
                                onChange={event => {
                                    modifyValue.customerName = event.target.value;
                                }}
                            />
                            <label className="form-label">
                                회사 연락처
                            </label>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                <input
                                    type="text"
                                    placeholder="010"
                                    className="form-input"
                                    style={{width:'15%', marginBottom:0, textAlign: 'center'}}
                                    defaultValue={customerTelArray[0]}
                                    onChange={event => {
                                        modifyValue.customerTel1 = event.target.value;
                                    }}
                                /> &nbsp;-&nbsp;
                                <input
                                    type="text"
                                    placeholder="0000"
                                    className="form-input"
                                    style={{width:'15%', marginLeft:'3px', marginBottom:0, textAlign: 'center'}}
                                    defaultValue={customerTelArray[1]}
                                    onChange={event => {
                                        modifyValue.customerTel2 = event.target.value;
                                    }}
                                /> &nbsp;-&nbsp;
                                <input
                                    type="text"
                                    placeholder="0000"
                                    className="form-input"
                                    style={{width:'15%',  marginLeft:'3px', marginBottom:0, textAlign: 'center'}}
                                    defaultValue={customerTelArray[2]}
                                    onChange={event => {
                                        modifyValue.customerTel3 = event.target.value;
                                    }}
                                />
                            </div>
                            <label className="form-label">
                                회사 대표자
                            </label>
                            <input
                                type="text"
                                placeholder="ex) 김아무개"
                                className="form-input"
                                defaultValue={customer.ceo}
                                onChange={event => {
                                    modifyValue.ceo = event.target.value;
                                }}
                            />
                            <label className="form-label">
                                거래처 업종
                            </label>
                            <input
                                type="text"
                                placeholder="ex) 제조업"
                                className="form-input"
                                value={customer.sector}
                                disabled
                            />
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <button className="form-cancel-button" style={{border: '1px solid lightgray'}} onClick={onClose}>
                                    취소
                                </button>
                                &nbsp;
                                <button className="form-button" onClick={this.state.updateCustomer}>
                                    수정
                                </button>
                            </div>
                        </Box>
                    </main>
                </section>
            </div>
        )
    }
}

export default CustomerModifyModal;