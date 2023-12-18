import {Component} from "react";
import AddInstructionBar from "../../components/Instruction/AddInstructionBar";
import AddInstructionTable from "../../components/Instruction/AddInstructionTable";
import {Button} from "@material-ui/core";
import Layout from "../../common/Layout";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {DeleteProductInstruction} from "../../object/ProductInstruction/product-instruction-object";
import "../../assets/css/Styles.css";
import {Title} from "../../core/Title";
import {SearchBox} from "../../core/box/SearchBox";
import {TableBox} from "../../core/box/TableBox";
import {Body} from "../../core/Body";
import Swal from 'sweetalert2';

type State = {
  selectedCheckBoxs: number[],
  productModalOpen: boolean,
  customerModalOpen: boolean,
  customerSearchModalOpen: boolean,
  changeProductModalStatus: () => void,
  changeCustomerModalStatus: () => void,
  changeCustomerSearchModalStatus: () => void,
  clearSelectedCheckBox: () => void
}

class AddInstructions extends Component<Props, State> {
  static contextType = InstructionsContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCheckBoxs: [],
      productModalOpen: false,
      customerModalOpen: false,
      customerSearchModalOpen: false,
      changeProductModalStatus: () => {
        this.setState({productModalOpen: !this.state.productModalOpen});
      },
      changeCustomerModalStatus: () => {
        this.setState({customerModalOpen: !this.state.customerModalOpen});
      },
      changeCustomerSearchModalStatus: () => {
        this.setState({customerSearchModalOpen: !this.state.customerSearchModalOpen});
      },
      clearSelectedCheckBox: () => {
        this.setState({selectedCheckBoxs: []})
      }
    }
  }

  deleteSelectedCheckBox = () => {
    const state = this.context as InstructionsState;
    this.state.selectedCheckBoxs.forEach(num => {
      let deleteProductInstruction = {
        instructionNo: state.instruction.instructionNo,
        productNo: num
      } as DeleteProductInstruction;

      state.deleteProductInstruction(deleteProductInstruction);
    })
    this.setState({selectedCheckBoxs: []});
    Swal.fire({
      icon: "success",
      text: "삭제되었습니다.",
      showConfirmButton: false,
      timer: 1000
    });
  };

  addSelectedCheckBox = (productNo: number) => {
    this.setState((prevState) => {
      let updatedChecks;
      const {selectedCheckBoxs} = prevState;
      const isProductNoChecked = selectedCheckBoxs.includes(productNo);
      if (isProductNoChecked) {
        updatedChecks = selectedCheckBoxs.filter((num) => num !== productNo);
      } else {
        updatedChecks = [...selectedCheckBoxs, productNo];
      }
      return {
        ...prevState,
        selectedCheckBoxs: updatedChecks,
      };
    });
  };

  existSelectedCheckBox = (productNo: number) => {
    return this.state.selectedCheckBoxs.filter((num) => num == productNo).length > 0;
  }

  componentDidMount = async () => {
    const state = this.context as InstructionsState;
    await state.cleanInstruction();
  }

  render() {
    const {
      selectedCheckBoxs,
      productModalOpen,
      customerModalOpen,
      customerSearchModalOpen
    } = this.state;
    let isChecksNotEmpty = selectedCheckBoxs.length != 0;

    return (
        <Layout>
          <Title title='지시등록'/>
          <Body>
            <SearchBox minWidth='1100px'>
              <AddInstructionBar customerSearchModalOpen={customerSearchModalOpen}
                                 changeCustomerSearchModalStatus={this.state.changeCustomerSearchModalStatus}
                                 clearSelectedCheckBox={this.state.clearSelectedCheckBox}
              />
            </SearchBox>
            <TableBox minWidth='1100px' minHeight='650px'>
              <AddInstructionTable addSelectedCheckBox={this.addSelectedCheckBox}
                                   productModalOpen={productModalOpen}
                                   customerModalOpen={customerModalOpen}
                                   changeProductModalStatus={this.state.changeProductModalStatus}
                                   changeCustomerModalStatus={this.state.changeCustomerModalStatus}
                                   existSelectedCheckBox={this.existSelectedCheckBox}
              />
            </TableBox>
          </Body>
          {isChecksNotEmpty &&
              <div className='delete-div' style={{
                height: '7vh', margin: 0
              }}>
                <div>
                  <span
                      style={{color: '#1ae0ed'}}>{selectedCheckBoxs.length}건 </span><span>선택됨</span>
                </div>
                <div>
                  <Button variant="outlined" style={{
                    lineHeight: 'normal',
                    background: '#50596c',
                    borderColor: '#b5b5b5',
                    color: '#fff',
                    marginRight: '100px'
                  }} onClick={this.deleteSelectedCheckBox}>삭제
                  </Button>
                </div>
              </div>
          }
        </Layout>
    )
  }
}

export default AddInstructions;