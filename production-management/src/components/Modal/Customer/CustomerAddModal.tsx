import {Component} from "react";
import {CustomersState, InsertCustomer} from "../../../object/Customer/customer-object";
import {CustomersContext} from "../../../store/Customer/customers-context";
import {Box} from "@material-ui/core";
import './CustomerModalCss.css'
import Swal from 'sweetalert2';
import BusinessIcon from '@material-ui/icons/Business';


type CustomerModalProps = {
    onClose: () => void,
    insertCustomer: (customerCode: string, customerName: string, customerTel: string, ceo: string, sector: string) => void
}

type CustomerModalState = {
    customer: InsertCustomer
    setCustomer: (customer: InsertCustomer) => void
    insertCustomer: () => void
}

let addValue = {
    customerCode: '',
    customerName: '',
    customerTel1: '',
    customerTel2: '',
    customerTel3: '',
    ceo: '',
    sector: '',
}

export class CustomerAddModal extends Component<CustomerModalProps, CustomerModalState> {
    static contextType = CustomersContext;

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

            insertCustomer: () => {
                const state = this.context as CustomersState;
                const customerTel = addValue.customerTel1+"-"+addValue.customerTel2+"-"+addValue.customerTel3;
                const customerCodePattern = /^[A-Z]\d{4}$/;
                const customerTelPattern = /^010-\d{4}-\d{4}$/;

                if (addValue.customerCode.length === 0 || addValue.customerName.length === 0 || addValue.customerTel1.length === 0 ||
                    addValue.customerTel2.length === 0 || addValue.customerTel3.length === 0 || addValue.ceo.length === 0 || addValue.sector.length === 0){
                    // alert("빈칸이 존재합니다.");
                    this.alertMessage('warning', '', '빈칸이 존재합니다.');
                    return;
                }

                if (!customerCodePattern.test(addValue.customerCode)) {
                    // alert("거래처 코드의 형식이 잘못되었습니다. (예: Z0001)");
                    this.alertMessage('warning', '', '거래처 코드의 형식이 잘못되었습니다. (예: Z0001)');
                    return;
                }
                if (!state.duplicateCustomerCodeResult.duplicateResult){
                    // alert("거래처 코드 중복을 확인해주세요.");
                    this.alertMessage('warning', '', '거래처 코드 중복을 확인해주세요.');
                    return;
                }
                if (addValue.customerName.length > 10) {
                    // alert("거래처 명칭은 10글자를 넘을 수 없습니다.");
                    this.alertMessage('warning', '', '거래처 명칭은 10글자를 넘을 수 없습니다.');
                    return;
                }
                if (!customerTelPattern.test(customerTel)) {
                    // alert("연락처의 형식이 잘못되었습니다. (예: 010-0000-0000)");
                    this.alertMessage('warning', '', '연락처의 형식이 잘못되었습니다. (예: 010-0000-0000)');
                    return;
                }
                if (addValue.ceo.length > 10) {
                    // alert("대표자는 10글자를 넘을 수 없습니다.");
                    this.alertMessage('warning', '', '대표자는 10글자를 넘을 수 없습니다.');
                    return;
                }
                if (addValue.sector.length > 10) {
                    // alert("업종은 10글자를 넘을 수 없습니다.");
                    this.alertMessage('warning', '', '업종은 10글자를 넘을 수 없습니다.');
                    return;
                }
                const {onClose, insertCustomer} = this.props as CustomerModalProps;
                insertCustomer(addValue.customerCode, addValue.customerName, customerTel, addValue.ceo, addValue.sector);
                onClose();
            },
        }
    }

    alertMessage = (icon: string, title: string, text: string) => {
        // @ts-ignore
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        });
    }

    componentDidMount() {
        const state = this.context as CustomersState;
        state.setCheckCustomerCodeDefault();
    }

    duplicateCustomerCode = () => {
        const customerCodePattern = /^[A-Z]\d{4}$/;
        if (!customerCodePattern.test(addValue.customerCode) || addValue.customerCode.length === 0) {
            // alert("거래처 코드의 형식이 잘못되었습니다. (예: Z0001)");
            this.alertMessage('warning', '', '거래처 코드의 형식이 잘못되었습니다. (예: Z0001)');
            return;
        }
        const state = this.context as CustomersState;
        state.setCheckCustomerCode(addValue.customerCode);
    }

    render() {
        const {onClose} = this.props as CustomerModalProps;
        const state = this.context as CustomersState;
        const duplicateResult = state.duplicateCustomerCodeResult.duplicateResult;

        return (
            <div className='modal'>
                    <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width:'450px', height: '600px'}}>
                        <div className="modalHeader" style={{height: '55px'}}>
                            <div style={{display: 'flex'}}><BusinessIcon/>&nbsp;거래처 등록</div>
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
                                    disabled
                                />
                                <label className="form-label">
                                    거래처 코드
                                </label>
                                <div style={{display:'flex'}}>
                                <input
                                    type="text"
                                    placeholder="ex) C0001(영문1+숫자4)"
                                    className="form-input"
                                    style={{width: '60%', marginBottom: '4px'}}
                                    onChange={(event => {
                                        addValue.customerCode = event.target.value
                                        state.duplicateCustomerCodeResult.duplicateResult = false
                                    })}
                                />
                                <button className="form-duplicate-button"
                                    onClick={this.duplicateCustomerCode}
                                >
                                    중복 체크
                                </button>
                                </div>
                                {duplicateResult?
                                    <span className="duplicate-span" style={{color: 'green'}}>
                                        사용 가능한 거래처 코드입니다.</span>
                                    : <span className="duplicate-span" style={{color: 'red'}}>
                                        거래처 코드 중복 확인은 필수입니다.</span>}
                                <label className="form-label">
                                    거래처 명칭
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex) 더존비즈온"
                                    className="form-input"
                                    onBlur={(event => {
                                        addValue.customerName = event.target.value
                                    })}
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
                                    onBlur={(event => {
                                        addValue.customerTel1 = event.target.value
                                    })}
                                /> &nbsp;-&nbsp;
                                <input
                                    type="text"
                                    placeholder="0000"
                                    className="form-input"
                                    style={{width:'15%', marginLeft:'3px', marginBottom:0, textAlign: 'center'}}
                                    onBlur={(event => {
                                        addValue.customerTel2 = event.target.value
                                    })}
                                /> &nbsp;-&nbsp;
                                <input
                                    type="text"
                                    placeholder="0000"
                                    className="form-input"
                                    style={{width:'15%',  marginLeft:'3px', marginBottom:0, textAlign: 'center'}}
                                    onBlur={(event => {
                                        addValue.customerTel3 = event.target.value
                                    })}
                                />
                                </div>
                                <label className="form-label">
                                    회사 대표자
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex) 홍길동"
                                    className="form-input"
                                    onBlur={(event => {
                                        addValue.ceo = event.target.value
                                    })}
                                />
                                <label className="form-label">
                                    거래처 업종
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex) 제조업"
                                    className="form-input"
                                    onBlur={(event => {
                                        addValue.sector = event.target.value
                                    })}
                                />
                                <div style={{display : 'flex', justifyContent: 'center'}}>
                                <button className="form-cancel-button" style={{border: '1px solid lightgray'}} onClick={onClose}>
                                    취소
                                </button>
                                    &nbsp;
                                <button className="form-button" onClick={this.state.insertCustomer}>
                                    등록
                                </button>
                                </div>
                            </Box>
                        </main>
                    </section>
            </div>
        )
    }
}

export default CustomerAddModal;