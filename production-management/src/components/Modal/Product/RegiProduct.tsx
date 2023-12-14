import React, { Component, ChangeEvent } from 'react';
import { ProductsContext } from "../../../store/Product/products-context";
import { ProductsState } from "../../../object/Product/product-object";
import { Box } from "@material-ui/core";
import './Modal.css';
import BusinessIcon from '@material-ui/icons/Business';

interface ModalProductProps {
    handleCloseModal: () => void;
}

interface regiProduct {
    productCode: string;
    productName: string;
    productStandard: string;
    productPrice:number;
    productWeight: number;
    productUnit: number;
    temCode:string;
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

    checkCodeClick = () => {
        const list = this.context.productPage.list;

        if (!this.state.productCode) {
            alert("품목 코드를 작성해주세요.");
            return;
        }

        // 유효성 검사 패턴
        const codePattern = /^[a-zA-Z]{2}\d{4}$/;

        if (!codePattern.test(this.state.productCode)) {
            alert("올바른 형식의 품목 코드를 입력해주세요.");
            return;
        }

        if (Array.isArray(list)) {
            if (list.some(item => item.productCode === this.state.productCode)) {
                alert("이미 존재하는 품목 코드입니다.");
                return;
            } else {
                this.setState({ temCode: this.state.productCode });
                alert("사용할 수 있는 품목 코드입니다.");
            }
        } else {
            alert("품목 목록을 가져올 수 없습니다.");
        }
    };

    onRegiClick = () => {
        if (!this.state.productName) {
            alert("품명 먼저 작성해주세요.");
            return;
        }
        if (!this.state.productStandard) {
            alert("규격을 작성해주세요.");
            return;
        }
        if (!this.state.productUnit || this.state.productUnit === 0) {
            alert("단위를 입력해주세요.");
            return;
        }
        if (this.state.productCode !== this.state.temCode) {
            alert("코드 조회를 다시해주세요.");
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

    handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof regiProduct) => {
        this.setState({
            ...this.state,
            [field]: e.target.value,
        });
    };

    render() {
        return (
            <div className='modal'>
                <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width:'350px', height: '480px'}}>
                    <div className="modalHeader" style={{height: '55px'}}>
                        <div style={{display: 'flex'}}><BusinessIcon/>&nbsp;품목 등록</div>
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
                                <input value={this.state.productName} placeholder="" className="form-input"
                                       onChange={(e) => this.handleInputChange(e, 'productName')} />
                            </label>
                            <label className="form-label" style={{width:'100%'}}>
                                품목 코드
                                <div style={{display:'flex', width:'63%'}}>
                                    <input
                                        value={this.state.productCode || ''}
                                        type="text"
                                        placeholder="ex) AP0001"
                                        className="form-input"
                                        style={{ width: '89px' }}
                                        onChange={(e) => this.handleInputChange(e, 'productCode')}
                                    />
                                    <button
                                        className="form-duplicate-button"
                                        style={{ marginLeft: '10px', border: '1px solid', height: '25px', borderRadius: '2px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}
                                        onClick={this.checkCodeClick}
                                    >
                                        코드 조회
                                    </button>
                                </div>
                            </label>
                            <label className="form-label">
                                품목 가격
                                <input
                                    value={this.state.productPrice}
                                    type="number"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productPrice')}
                                />
                            </label>
                            <label className="form-label">
                                품목 규격
                                <input
                                    value={this.state.productStandard}
                                    type="text"
                                    placeholder="ex) 23mm*12mm"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productStandard')}
                                />
                            </label>
                            <label className="form-label">
                                품목 무게
                                <input
                                    value={this.state.productWeight}
                                    type="number"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productWeight')}
                                />
                            </label>
                            <label className="form-label">
                                품목 단위
                                <input
                                    value={this.state.productUnit}
                                    type="number"
                                    className="form-input"
                                    onChange={(e) => this.handleInputChange(e, 'productUnit')}
                                />
                            </label>
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
