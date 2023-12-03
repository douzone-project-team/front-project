import React, {Component} from "react";
import {Fade, Modal, Paper} from "@material-ui/core";
import {ProductsContext, Props} from "../../store/Product/products-context";
import {ProductsState} from "../../object/Product/product-object";
import ModalProduct from "../Modal/Product/RegiProduct";
import {BarBox} from "../../core/BarBox";
import {AddItemButton} from "../../core/button/AddItemButton";
import {SearchButton} from "../../core/button/SearchButton";
import { TextInput } from '../../core/input/TextInput';

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
    this.setState(
        {
          isModalOpen: false,
        },
        () => {
          window.location.reload(); // 강제로 페이지 리로드
        }
    );
  };

  render() {
    const state = this.context as ProductsState;

    return (
        <BarBox>
          <div style={{marginBottom: "7px", marginTop: "7px"}}>
            <TextInput title='품목 코드' onBlur={(e) => {
              this.setState({productCode: e.target.value});
            }}/>
            <TextInput title='품목 이름' onBlur={(e) => {
              this.setState({productName: e.target.value});
            }}/>
          </div>
          <div style={{marginTop: '6px', marginRight: '7px'}}>
            <SearchButton size={30} onClick={this.handleSearchClick}/>
            &nbsp;&nbsp;
            <AddItemButton size={30} onClick={this.handleAddClick}/>
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
                {this.state.isModalOpen && <ModalProduct handleCloseModal={this.handleCloseModal}/>}
              </Paper>
            </Fade>
          </Modal>
        </BarBox>
    );
  }
}

export default ProductTopBar;
