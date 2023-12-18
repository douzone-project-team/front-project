import {Component} from "react";
import SearchInstructionBar from "../../components/Instruction/SearchInstructionBar";
import ViewInstructionListTable from "../../components/Instruction/ViewInstructionListTable";
import ViewInstructionTable from "../../components/Instruction/ViewInstructionTable";
import Layout from "../../common/Layout";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {SearchBox} from "../../core/box/SearchBox";
import {TableBox} from "../../core/box/TableBox";
import {Title} from "../../core/Title";
import {Body} from "../../core/Body";
import {TableSizeButton} from "../../core/button/TableSizeButton";
import {DeleteProductInstruction} from "../../object/ProductInstruction/product-instruction-object";
import Button from "@material-ui/core/Button/Button";
import Swal from 'sweetalert2';

type State = {
  selectedCheckBoxs: number[],
  tableSize: boolean,
  sizeUp: () => void,
  productModalOpen: boolean,
  customerModalOpen: boolean,
  changeProductModalStatus: () => void,
  changeCustomerModalStatus: () => void,
  changeAmount: boolean,
  changeTarget: number,
  changeTargetNumber: (target: number) => void,
  changeAmountStatus: () => void,
  changeAmountStatusFalse: () => void,
}

class ViewInstructions extends Component<Props, State> {


  constructor(props: Props) {
    super(props);

    this.state = {
      selectedCheckBoxs: [],
      tableSize: true,
      sizeUp: () => {
        this.setState({tableSize: !this.state.tableSize})
      },
      productModalOpen: false,
      customerModalOpen: false,
      changeProductModalStatus: () => {
        this.setState({productModalOpen: !this.state.productModalOpen});
      },
      changeCustomerModalStatus: () => {
        this.setState({customerModalOpen: !this.state.customerModalOpen});
      },
      changeAmount: false,
      changeTarget: 0,
      changeTargetNumber: (target: number) => {
        this.setState({changeTarget: target});
      },
      changeAmountStatus: () => {
        this.setState({changeAmount: !this.state.changeAmount});
      },
      changeAmountStatusFalse: () => {
        this.setState({changeAmount: false});
      }
    }
  }

  clearCheckBoxs = () => {
    this.setState({selectedCheckBoxs : []})
  };

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

  static contextType = InstructionsContext;

  componentDidMount = async () => {
    const state = this.context as InstructionsState;
    await state.cleanInstruction();
    state.getInitInstruction();
  }

  render() {
    const {selectedCheckBoxs} = this.state;
    let isChecksNotEmpty = selectedCheckBoxs.length != 0;

    return (
        <Layout>
          <Title title='지시현황'/>
          <Body>
            <SearchBox minWidth='1250px'>
              <SearchInstructionBar/>
            </SearchBox>
            <TableBox minWidth='1250px' minHeight='650px'>
              <ViewInstructionListTable tableSize={this.state.tableSize}
                                        tableSizeUp={this.state.sizeUp}
                                        changeAmountStatusFalse={this.state.changeAmountStatusFalse}
                                        clearCheckBoxs={this.clearCheckBoxs}
              />
              <div style={{textAlign: 'center'}}>
                <TableSizeButton tableSize={this.state.tableSize} tableSizeUp={this.state.sizeUp}/>
              </div>
              <ViewInstructionTable tableSize={this.state.tableSize}
                                    productModalOpen={this.state.productModalOpen}
                                    customerModalOpen={this.state.customerModalOpen}
                                    changeProductModalStatus={this.state.changeProductModalStatus}
                                    changeCustomerModalStatus={this.state.changeCustomerModalStatus}
                                    changeAmount={this.state.changeAmount}
                                    changeAmountStatus={this.state.changeAmountStatus}
                                    tableSizeUp={this.state.sizeUp}
                                    changeTarget={this.state.changeTarget}
                                    changeTargetNumber={this.state.changeTargetNumber}
                                    existSelectedCheckBox={this.existSelectedCheckBox}
                                    addSelectedCheckBox={this.addSelectedCheckBox}
                                    clearCheckBoxs={this.clearCheckBoxs}
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

export default ViewInstructions;