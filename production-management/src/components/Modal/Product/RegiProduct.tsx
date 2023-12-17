import React, { Component, ChangeEvent } from 'react';
import { ProductsContext } from "../../../store/Product/products-context";
import { ProductsState } from "../../../object/Product/product-object";
import { Box } from "@material-ui/core";
import './Modal.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Swal from "sweetalert2";
import {CustomersState} from "../../../object/Customer/customer-object";

interface ModalProductProps {
    handleCloseModal: () => void;
}

interface regiProduct {
    productCode: string;
    productName: string;
    productStandard: string;
    productPrice: number;
    productWeight: number;
    productUnit: number;
    temCode: string | null;
}


class ModalProduct extends Component<ModalProductProps, regiProduct> {
    static contextType = ProductsContext;
    context!: React.ContextType<typeof ProductsContext>;

    constructor(props: ModalProductProps) {
        super(props);

        this.state = {
            productCode: '',
            productName: '',
            productStandard: '',
            productPrice: 0,
            productWeight: 0,
            productUnit: 0,
            temCode: '',
        };
    }
    alertMessage = (icon: string, title: string, text: string) => {
        // @ts-ignore
        Swal.fire({
            icon: icon,
            title: title,
            text: text,

        });
    }

    checkCodeClick = () => {
        const list = this.context.productPage.list;

        if (!this.state.productCode) {
            return;
        }

        // 유효성 검사 패턴
        const codePattern = /^[a-zA-Z]{2}\d{4}$/;

        if (!codePattern.test(this.state.productCode)) {
            this.alertMessage('warning', '', '품목 코드의 형식이 잘못되었습니다. (예: AP0001)');
            return;
        }

        if (Array.isArray(list)) {
            if (list.some(item => item.productCode === this.state.productCode)) {
                this.alertMessage('warning', '', '이미 존재하는 품목 코드입니다.');
            } else {
                this.setState({ temCode: this.state.productCode });
                this.alertMessage('success', '', '사용할 수 있는 품목 코드입니다.');
            }
        } else {
            this.alertMessage('error', '', '품목 목록을 가져올 수 없습니다.');
        }
    };

// 중복 체크 버튼 클릭 시 품목 코드 입력란이 변경될 때 호출되는 함수
    handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof regiProduct) => {
        // 사용자가 다른 코드를 입력하면 temCode를 초기화
        if (field === 'productCode') {
            this.setState({
                ...this.state,
                [field]: e.target.value,
                temCode: '', // 사용자가 다른 코드를 입력하면 temCode를 초기화
            });
        } else {
            this.setState({
                ...this.state,
                [field]: e.target.value,
            });
        }
    };



    onRegiClick = () => {
        if (!this.state.productName) {
            this.alertMessage('warning', '', '품명을 작성해주세요.');
            return;
        }
        if (!this.state.productPrice) {
            this.alertMessage('warning', '', '가격을 작성해주세요.');
            return;
        }
        if (!this.state.productWeight) {
            this.alertMessage('warning', '', '무게를 작성해주세요.');
            return;
        }
        if (!this.state.productStandard) {
            this.alertMessage('warning', '', '규격을 작성해주세요.');
            return;
        }
        if (!this.state.productUnit || this.state.productUnit === 0) {
            this.alertMessage('warning', '', '단위를 입력해주세요.');
            return;
        }
        if (this.state.productCode !== this.state.temCode) {
            this.alertMessage('warning', '', '코드 조회를 다시해주세요.');
            return;
        } else {
            this.context.regiProducts(
                this.state.productCode,
                this.state.productName,
                this.state.productStandard,
                this.state.productUnit,
                this.state.productPrice,
                this.state.productWeight,
            );
            this.alertMessage('success', '', '품목이 성공적으로 등록되었습니다.');
        }

        this.props.handleCloseModal();
        this.setState({
            productCode: '',
            productName: '',
            productStandard: '',
            productPrice: 0,
            productWeight: 0,
            productUnit: 0,
            temCode: '',
        });
    };



    render() {
        const { temCode, productCode } = this.state;
        return (
            <div className='modal'>
                <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width:'450px', height: '600px'}}>
                    <div className="modalHeader" style={{height: '55px'}}>
                        <div style={{display: 'flex'}}><DashboardIcon/>&nbsp;품목 등록</div>
                        <button className="close" onClick={this.props.handleCloseModal}>
                            &times;
                        </button>
                    </div>
                        <main className="product-modal-main" style={{border: "none", display: 'grid', placeItems: 'center'}}>
                            <Box
                                sx={{
                                width: '95%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '8px',
                            }}
                        >
                            <label className="form-label">
                                품목 이름
                            </label>
                                <input value={this.state.productName} placeholder="" className="form-input"
                                       onChange={(e) => this.handleInputChange(e, 'productName')} />
                            <label className="form-label" style={{width:'100%'}}>
                                품목 코드
                            </label>
                                <div style={{display:'flex', width:'100%'}}>
                                    <input
                                        value={this.state.productCode || ''}
                                        type="text"
                                        placeholder="ex) AP0001"
                                        className="form-input"
                                        style={{width: '60%', marginBottom: '4px'}}
                                        onChange={(e) => this.handleInputChange(e, 'productCode')}
                                    />
                                    <button className="form-duplicate-button" onClick={this.checkCodeClick}>
                                        중복 체크
                                    </button>
                                </div>
                                {temCode ? (
                                    <span className="duplicate-span" style={{ color: 'green' }}>
                                사용 가능한 품목 코드입니다.
                            </span>
                                ) : (
                                    <span className="duplicate-span" style={{ color: 'red' }}>
                                품목 코드 중복 확인은 필수입니다.
                            </span>
                                )}
                            <label className="form-label">
                                품목 가격
                            </label>
                                <input
                                    value={this.state.productPrice}
                                    type="number"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productPrice')}
                                    min="0"
                                />
                            <label className="form-label">
                                품목 규격
                            </label>
                                <input
                                    value={this.state.productStandard}
                                    type="text"
                                    placeholder="ex) 23mm*12mm"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productStandard')}
                                />
                            <label className="form-label">
                                품목 무게
                            </label>
                                <input
                                    value={this.state.productWeight}
                                    type="number"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productWeight')}
                                    min="0"
                                />
                            <label className="form-label">
                                품목 단위
                            </label>
                                <input
                                    value={this.state.productUnit}
                                    type="number"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productUnit')}
                                    min="0"
                                />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className="form-cancel-button" style={{ border: '1px solid lightgray' }} onClick={this.props.handleCloseModal}>
                                    취소
                                </button>
                                &nbsp;
                                <button className="form-button" onClick={this.onRegiClick}>
                                    등록
                                </button>
                            </div>
                        </Box>
                    </main>
                </section>
            </div>
        );
    }
}

export default ModalProduct;
