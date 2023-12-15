import React, { Component, ChangeEvent } from 'react';
import { ProductsContext } from "../../../store/Product/products-context";
import { Product } from "../../../object/Product/product-object";
import './Modal.css';
import { Box } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import Swal from "sweetalert2";

interface ModalProductProps {
    handleCloseModal: () => void;
    product: Product;
}

interface ModalProductState {
    updatedProduct: Product;
}

class ModalProduct extends Component<ModalProductProps, ModalProductState> {
    static contextType = ProductsContext;

    constructor(props: ModalProductProps) {
        super(props);
        this.state = {
            updatedProduct: {
                productNo: props.product.productNo,
                productCode: props.product.productCode,
                productName: props.product.productName,
                price: props.product.price,
                standard: props.product.standard,
                weight: props.product.weight,
                unit: props.product.unit,
            },
        };

        // 이벤트 핸들러 바인딩
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }
    alertMessage = (icon: string, title: string, text: string) => {
        // @ts-ignore
        Swal.fire({
            icon: icon,
            title: title,
            text: text,

        });
    }
    handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            updatedProduct: {
                ...prevState.updatedProduct,
                [name]: value,
            },
        }));
    }

    handleUpdateClick() {
        const { updatedProduct } = this.state;
        const { updateProduct } = this.context;

        if (!updatedProduct.productName) {
            this.alertMessage('warning', '', '품명을 작성해주세요.');
            return;
        }
        if (!updatedProduct.price) {
            this.alertMessage('warning', '', '가격을 작성해주세요.');
            return;
        }
        if (!updatedProduct.weight) {
            this.alertMessage('warning', '', '무게를 작성해주세요.');
            return;
        }
        if (!updatedProduct.standard) {
            this.alertMessage('warning', '', '규격을 작성해주세요.');
            return;
        }
        if (!updatedProduct.unit) {
            this.alertMessage('warning', '', '단위를 입력해주세요.');
            return;
        }

        updateProduct(
            updatedProduct.productNo,
            updatedProduct.productCode,
            updatedProduct.productName,
            updatedProduct.standard,
            updatedProduct.unit,
            updatedProduct.weight,
            updatedProduct.price
        );

        window.location.reload();
        this.props.handleCloseModal();
    }

    render() {
        const { updatedProduct } = this.state;

        return (
            <div className='modal'>
                <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width:'450px', height: '600px'}}>
                    <div className="modalHeader" style={{height: '55px'}}>
                        <div style={{display: 'flex'}}><BusinessIcon/>&nbsp;품목 수정</div>
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
                            <label className="form-label" style={{width:'100%'}}>
                                품목 코드
                                <div style={{display:'flex', width:'100%'}}>
                                    <input
                                        value={updatedProduct.productCode || ''}
                                        type="text"
                                        className="form-input"
                                        style={{width: '100%', marginBottom: '4px',
                                        backgroundColor:'#D5D5D5'}}
                                        disabled
                                    />
                                </div>
                            </label>

                            <label className="form-label">
                                품목 이름
                                <input
                                    type="text"
                                    name="productName"
                                    value={updatedProduct.productName}
                                    onChange={this.handleInputChange}
                                    className="form-input"/>
                            </label>
                            <label className="form-label">
                                품목 가격
                                <input
                                    type="text"
                                    name="price"
                                    value={updatedProduct.price.toLocaleString()}
                                    onChange={this.handleInputChange}
                                    className="form-input"
                                />
                            </label>
                            <label className="form-label">
                                품목 규격
                                <input
                                    type="text"
                                    name="standard"
                                    value={updatedProduct.standard}
                                    onChange={this.handleInputChange}
                                    className="form-input"
                                />
                            </label>
                            <label className="form-label">
                                품목 무게
                                <input
                                    type="text"
                                    name="weight"
                                    value={updatedProduct.weight}
                                    onChange={this.handleInputChange}
                                    className="form-input"
                                />
                            </label>
                            <label className="form-label">
                                품목 단위
                                <input
                                    type="text"
                                    name="unit"
                                    value={updatedProduct.unit}
                                    onChange={this.handleInputChange}
                                    className="form-input"
                                />
                            </label>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className="form-cancel-button" style={{ border: '1px solid lightgray' }} onClick={this.props.handleCloseModal}>
                                    취소
                                </button>
                                &nbsp;
                                <button className="form-button" onClick={this.handleUpdateClick}>
                                    수정
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
