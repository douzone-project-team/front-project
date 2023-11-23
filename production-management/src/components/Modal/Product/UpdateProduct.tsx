import React, { useState, useContext, ChangeEvent } from 'react';
import { ProductsContext } from "../../../store/Product/products-context";
import { Product } from "../../../object/Product/product-object";
import './Modal.css';
import {Box} from "@material-ui/core";

interface ModalProductProps {
    handleCloseModal: () => void;
}

const ModalProduct: React.FC<ModalProductProps> = ({ handleCloseModal }) => {
    const { product, updateProduct } = useContext(ProductsContext);

    const [updatedProduct, setUpdatedProduct] = useState<Product>({
        productNo: product.productNo,
        productCode: product.productCode,
        productName: product.productName,
        standard: product.standard,
        unit: product.unit,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleUpdateClick = () => {
        if (
            updatedProduct.productName.trim() === '' ||
            updatedProduct.standard.trim() === '' ||
            updatedProduct.unit === 0
        ) {
            alert("모두 기재해주세요.");
            return;
        }

        // Call the updateProduct function from the context with the updatedProduct
        updateProduct(
            updatedProduct.productNo,
            updatedProduct.productCode,
            updatedProduct.productName,
            updatedProduct.standard,
            updatedProduct.unit
        );
        window.location.reload();
        handleCloseModal();
    };

    return (
        <div className='modal'>
            <section className='modal-container' style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', width: '100%',height:'100%' }}>
                    <header>
                        <button className="close" onClick={handleCloseModal}>
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
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginRight: '10px' }}>품목 코드</p>
                            <input
                                type="text"
                                name="productCode"
                                value={updatedProduct.productCode}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginRight: '10px' }}>품목 이름</p>
                            <input
                                type="text"
                                name="productName"
                                value={updatedProduct.productName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginRight: '10px' }}>품목 규격</p>
                            <input
                                type="text"
                                name="standard"
                                value={updatedProduct.standard}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginRight: '10px' }}>품목 단위</p>
                            <input
                                type="text"
                                name="unit"
                                value={updatedProduct.unit}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="form-button"
                            onClick={handleUpdateClick}>수정하기</button>
                    </div>
                        </Box>
                    </main>
                </section>
        </div>
    );
};

export default ModalProduct;
