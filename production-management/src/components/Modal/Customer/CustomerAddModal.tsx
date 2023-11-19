import {Component} from "react";
import {InsertCustomer} from "../../../object/Customer/customer-object";
import {CustomersContext} from "../../../store/Customer/customers-context";
import {Box} from "@material-ui/core";
import './CustomerModalCss.css'

type CustomerModalProps = {
    onClose: () => void,
    status: boolean,
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
                const customerTel = addValue.customerTel1+"-"+addValue.customerTel2+"-"+addValue.customerTel3;
                const {onClose, insertCustomer} = this.props as CustomerModalProps;
                insertCustomer(addValue.customerCode, addValue.customerName, customerTel, addValue.ceo, addValue.sector);
                onClose();
            }
        }


    }

    render() {
        const {onClose, status} = this.props as CustomerModalProps;

        return (
            <div className='modal'>
                {status ? (
                    <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width:'35%'}}>
                        <header>
                            <button className="close" onClick={onClose}>
                                &times;
                            </button>
                        </header>
                        <main style={{border: "none", display: 'grid', placeItems: 'center'}}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '20px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <label className="form-label">
                                    거래처 번호
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="form-input"
                                        disabled
                                    />
                                </label>
                                <label className="form-label">
                                    거래처 코드
                                    <input
                                        type="text"
                                        placeholder="ex) C0001"
                                        className="form-input"
                                        onBlur={(event => {
                                            addValue.customerCode = event.target.value
                                        })}
                                    />
                                </label>
                                <label className="form-label">
                                    거래처 명칭
                                    <input
                                        type="text"
                                        placeholder="ex) 더존비즈온"
                                        className="form-input"
                                        onBlur={(event => {
                                            addValue.customerName = event.target.value
                                        })}
                                    />
                                </label>
                                <label className="form-label">
                                    회사 연락처
                                    <input
                                        type="text"
                                        placeholder="010"
                                        className="form-input"
                                        style={{width:'40px'}}
                                        onBlur={(event => {
                                            addValue.customerTel1 = event.target.value
                                        })}
                                    /> -
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        className="form-input"
                                        style={{width:'45px', marginLeft:'7px'}}
                                        onBlur={(event => {
                                            addValue.customerTel2 = event.target.value
                                        })}
                                    /> -
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        className="form-input"
                                        style={{width:'45px', marginLeft:'7px'}}
                                        onBlur={(event => {
                                            addValue.customerTel3 = event.target.value
                                        })}
                                    />
                                </label>
                                <label className="form-label">
                                    회사 대표자
                                    <input
                                        type="text"
                                        placeholder="ex) 김아무개"
                                        className="form-input"
                                        onBlur={(event => {
                                            addValue.ceo = event.target.value
                                        })}
                                    />
                                </label>
                                <label className="form-label">
                                    거래처 업종
                                    <input
                                        type="text"
                                        placeholder="ex) 제조업"
                                        className="form-input"
                                        onBlur={(event => {
                                            addValue.sector = event.target.value
                                        })}
                                    />
                                </label>
                                <button className="form-button" onClick={this.state.insertCustomer}>
                                    등록
                                </button>
                            </Box>
                        </main>
                        <footer style={{padding: '30px'}}>
                        </footer>
                    </section>
                ) : null}
            </div>
        )
    }
}

export default CustomerAddModal;