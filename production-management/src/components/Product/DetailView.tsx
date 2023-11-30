    import React, { Component } from "react";
import {Fade, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
    import { ProductsContext } from "../../store/Product/products-context";
import { ProductsState } from "../../object/Product/product-object";

import "./../../assets/css/Table.css";
import ModalProduct from "../Modal/Product/UpdateProduct";

const boldCellStyle = {
    border: '1px solid #D3D3D3',
    fontWeight: 'bold',
    width: '10%',
};

const cellStyle = {
    border: '1px solid #D3D3D3',
    width: '10%',
};

interface DetailState {
    isModalOpen?: boolean;
    history: any;
}

class DetailProduct extends Component<{}, DetailState> {
    static contextType = ProductsContext;

    constructor(props: {}) {
        super(props);
        this.state = {
            isModalOpen: false,
            history: null, // 여기에 history 속성 추가
        };
    }

    componentDidMount() {
        this.checkReload();
    }

    componentDidUpdate(prevProps: any, prevState: DetailState) {
        if (this.state.isModalOpen !== prevState.isModalOpen) {

        }
    }

    checkReload() {
        const state = this.context as ProductsState;
        const product = state.product;

        product.productNo=0;
        product.productCode='';
        product.productName='';
        product.price=0;
        product.standard='';
        product.weight=0;
        product.unit=0;

    }

    handlerModify = () => {
        const state = this.context as ProductsState;
        const product = state.product;
        if (product.productNo !== 0) {
            this.setState({
                isModalOpen: true,
            });
        }else {
            alert("품목을 선택해주세요");
        }
    };
    handlerDelete = async (productNo: number) => {
        const state = this.context as ProductsState;
        if (productNo !== 0) {
            try {
                const isDeleted = await state.deleteProduct(productNo);
                if (isDeleted) {
                    window.location.reload();
                } else {
                    alert("삭제 실패");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("삭제 중 오류가 발생했습니다");
            }
        } else {
            alert("품목을 선택해주세요");
        }
    };


    handleCloseModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    render() {
        const state = this.context as ProductsState;
        const product = state.product;

        return (
            <>
                <div style={{ width: "", marginBottom: "7px", marginTop: "7px", display: "flex", justifyContent: "space-between" }}>
                    <label>
                       <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                            품목 상세 {product.productNo !== 0 && `: `}
                           {product.productNo !== 0 && <span style={{ color: '#0C70F2', marginRight: "0" }}>{product.productNo}</span>}
                        </span>

                    </label>
                    <div style={{ display: "flex", justifyContent: "flex-end", width: "50%" }}>
                            <img src={require('../../images/button/modify-button.png')}
                                 style={{width: '25px', marginRight: '10px', marginTop: '6px'}}
                                 className='cellHoverEffect' onClick={this.handlerModify}/>

                        <img src={require('../../images/button/delete-button.png')}
                             style={{width: '25px', marginRight: '10px', marginTop: '6px'}}
                             className='cellHoverEffect'
                             onClick={() => this.handlerDelete(product.productNo)}/>
                    </div>
                </div>

                <TableContainer className='table-container' style={{ height: '73px' }}>
                    <Table size='small' className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={boldCellStyle}>품목 번호</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 코드</TableCell>
                                <TableCell align="center" style={boldCellStyle}>품목 이름</TableCell>
                                <TableCell align="center" style={boldCellStyle}>가격</TableCell>
                                <TableCell align="center" style={boldCellStyle}>규격</TableCell>
                                <TableCell align="center" style={boldCellStyle}>무게</TableCell>
                                <TableCell align="center" style={boldCellStyle}>단위</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product && product.productNo !== 0 && product.unit !== 0 && (
                                <TableRow>
                                    <TableCell align="center" style={cellStyle}>{product.productNo}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{product.productCode}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{product.productName}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{product.price.toLocaleString()+'원'}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{product.standard}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{product.weight+'g'}</TableCell>
                                    <TableCell align="center" style={cellStyle}>{product.unit}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={this.state.isModalOpen ?? false}
                    onClose={this.handleCloseModal}
                    closeAfterTransition
                    BackdropProps={{
                        invisible: true,
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.isModalOpen || false}>
                        <Paper
                            style={{
                                width: "400px",
                                maxHeight: "80%",
                                overflowY: "auto",
                                margin: "auto",
                                border: "5",
                                borderRadius: 0,
                                boxShadow: "10",
                            }}
                        >
                            <ModalProduct
                                handleCloseModal={this.handleCloseModal}
                            />
                        </Paper>
                    </Fade>
                </Modal>
            </>
        );
    }
}

export default DetailProduct;