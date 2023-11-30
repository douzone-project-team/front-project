import React, { useState, useContext } from 'react';
import { ProductsContext } from "../../../store/Product/products-context";
import { ProductsState } from "../../../object/Product/product-object";
import { Box } from "@material-ui/core";
import './Modal.css';

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

const ModalProduct: React.FC<ModalProductProps> = ({ handleCloseModal }) => {

    const [productInfo, setProductInfo] = useState<regiProduct>({
        productCode: '',
        productName: '',
        productStandard: '',
        productPrice:0,
        productWeight:0,
        productUnit: 0,
        temCode:'',
    });

    const state = useContext(ProductsContext) as ProductsState;


    const checkCodeClick = () => {
        const list = state.productPage.list;

        if (!productInfo.productCode) {
            alert("품목 코드를 작성해주세요.");
            return;
        }

        // 유효성 검사 패턴
        const codePattern = /^[a-zA-Z]{2}\d{4}$/;

        if (!codePattern.test(productInfo.productCode)) {
            alert("올바른 형식의 품목 코드를 입력해주세요.");
            return;
        }

        if (Array.isArray(list)) {
            if (list.some(item => item.productCode === productInfo.productCode)) {
                alert("이미 존재하는 품목 코드입니다.");
            } else {
                productInfo.temCode = productInfo.productCode;
                alert("사용할 수 있는 품목 코드입니다.");
            }
        } else {
            alert("품목 목록을 가져올 수 없습니다.");
        }
    };

    const onRegiClick = () => {
        if (!productInfo.productName) {
            alert("품명 먼저 작성해주세요.");
            return;
        }
        if (!productInfo.productStandard) {
            alert("규격을 작성해주세요.");
            return;
        }
        if (!productInfo.productUnit || productInfo.productUnit === 0) {  // 수정된 부분
            alert("단위를 입력해주세요.");
            return;
        }
        if (productInfo.productCode !== productInfo.temCode) {
            alert("코드 조회를 다시해주세요.");
            state.regiProducts(
                productInfo.productCode,
                productInfo.productName,
                productInfo.productStandard,
                productInfo.productUnit,
                productInfo.productPrice,
                productInfo.productWeight,
            );
            return;

        }

        handleCloseModal();
        setProductInfo({
            productCode: '',
            productName: '',
            productStandard: '',
            productPrice: 0,  // 수정된 부분
            productWeight: 0,  // 수정된 부분
            productUnit: 0,
            temCode: '',
        });
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof regiProduct) => {
        setProductInfo({
            ...productInfo,
            [field]: e.target.value,
        });
    };

    return (
        <div className='modal'>
            <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width: '100%',height:'100%' }}>
                <header>
                    <button className="close" onClick={handleCloseModal}>
                        &times;
                    </button>
                </header>
                <main style={{ border: "none", display: 'grid', placeItems: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <label className="form-label">
                            품목 이름
                            <input value={productInfo.productName} placeholder="" className="form-input" onChange={(e) => handleInputChange(e, 'productName')} />
                        </label>
                        <label className="form-label">
                            품목 코드
                            <input
                                value={productInfo.productCode}
                                type="text"
                                placeholder="ex) AP0001"
                                className="form-input"
                                style={{ width: '89px' }}
                                onChange={(e) => handleInputChange(e, 'productCode')}
                            />
                            <button
                                style={{ marginLeft: '20px', border: '1px solid', height: '25px', borderRadius: '2px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}
                                onClick={checkCodeClick}
                            >
                                코드 조회
                            </button>
                        </label>

                        <label className="form-label">
                            품목 가격
                            <input
                                value={productInfo.productPrice}
                                type="number"
                                className="form-input"
                                onChange={(e) => handleInputChange(e, 'productPrice')}
                            />
                        </label>
                        <label className="form-label">
                            품목 규격
                            <input
                                value={productInfo.productStandard}
                                type="text"
                                placeholder="ex) 23mm*12mm"
                                className="form-input"
                                onChange={(e) => handleInputChange(e, 'productStandard')}
                            />
                        </label>
                        <label className="form-label">
                            품목 무게
                            <input
                                value={productInfo.productWeight}
                                type="number"
                                className="form-input"
                                onChange={(e) => handleInputChange(e, 'productWeight')}
                            />
                        </label>
                        <label className="form-label">
                            품목 단위
                            <input
                                value={productInfo.productUnit}
                                type="text"
                                className="form-input"
                                onChange={(e) => handleInputChange(e, 'productUnit')}
                            />
                        </label>
                        <button className="form-button" onClick={onRegiClick}>
                            등록
                        </button>
                    </Box>
                </main>
            </section>
        </div>
    );
};

export default ModalProduct;
