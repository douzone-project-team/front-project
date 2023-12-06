import React, { Component } from "react";
import { Box, Paper, Modal, Fade } from "@material-ui/core";
import {ProductsState} from "../../../object/Product/product-object";
import ModalProduct from "./RegiProduct";
import {ProductsContext, Props} from "../../../store/Product/products-context";

interface SearchState {
    productCode: string;
    productName: string;
    isModalOpen?: boolean;
}

class ProductTopBar extends Component<{}, SearchState> {
    static contextType = ProductsContext;

    constructor(props: Props) {
        super(props);

        this.state = {
            productName: "",
            productCode: "",
        };
    }

    handleSearchClick = () => {
        const state = this.context as ProductsState;
        state.setProductCodeAndName(this.state.productCode, this.state.productName);
    };

    handleAddClick = () => {
        console.log(`모달 클릭됨`);
        this.setState({
            isModalOpen: true,
        });
    };

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false,
        }, () => {
            window.location.reload(); // 강제로 페이지 리로드
        });
    };


    render() {
        const state = this.context as ProductsState;

        return (
            <Box
                sx={{
                    width: "100%",
                    height: "40px",
                    border: "1.4px solid #D3D3D3",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ marginBottom: "7px", marginTop: "7px" }}>
                    <label>
                        <span
                            style={{
                                marginLeft: "50px",
                                marginRight: "5px",
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                        >
                            상품 코드
                        </span>
                        <input
                            type="text"
                            placeholder="상품 코드"
                            style={{ height: "20px" }}
                            onChange={(e) => {
                                this.setState({ productCode: e.target.value });
                            }}
                        />
                    </label>
                    <label>
                        <span
                            style={{
                                marginLeft: "50px",
                                marginRight: "5px",
                                fontSize: "14px",
                                fontWeight: "bold",
                            }}
                        >
                            상품 이름
                        </span>
                        <input
                            type="text"
                            placeholder="상품 이름"
                            style={{ height: "20px" }}
                            onChange={(e) => {
                                this.setState({ productName: e.target.value });
                            }}
                        />
                    </label>
                </div>
                <div style={{ display: "flex", marginTop: "35px", marginBottom: "35px", marginLeft: "10px", flexGrow: 1 }}>
                    <div style={{flexGrow: 1}}>
                        <button
                            type="submit"
                            style={{ height: "25px",  width: "45px" }}
                            onClick={this.handleSearchClick}
                        >
                            검색
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            style={{ height: "25px", marginRight: "30px" }}
                            onClick={() => this.handleAddClick()}
                        >
                            품목 추가
                        </button>
                    </div>
                </div>

                <Modal
                    open={this.state.isModalOpen ?? false}
                    onClose={this.handleCloseModal}
                    closeAfterTransition
                    BackdropProps={{
                        invisible: true,
                        timeout: 500,
                    }}
                    key={this.state.isModalOpen ? 'modalOpen' : 'modalClosed'} // 문자열로 key 값 지정
                >
                    <Fade in={this.state.isModalOpen || false}>
                        <Paper
                            style={{
                                width: "400px",
                                maxHeight: "80%",
                                margin: "auto",
                                border: "5",
                                borderRadius: 0,
                                boxShadow: "10",
                            }}
                        >
                            {/* ModalProduct 모달을 포함한 내용 */}
                            {this.state.isModalOpen && <ModalProduct handleCloseModal={this.handleCloseModal} />}
                        </Paper>
                    </Fade>
                </Modal>
            </Box>
        );
    }
}

export default ProductTopBar;