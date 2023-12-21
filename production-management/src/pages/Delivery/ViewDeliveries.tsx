import {Component} from "react";
import ViewDeliveryListTable from "../../components/Delivery/ViewDeliveryListTable";
import Layout from "../../common/Layout";
import SearchDeliveryBar from "../../components/Delivery/SearchDeliveryBar";
import ViewDeliveryTable from "../../components/Delivery/ViewDeliveryTable";
import {DeliveriesContext, Props} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {SearchBox} from "../../core/box/SearchBox";
import {TableBox} from "../../core/box/TableBox";
import {Title} from "../../core/Title";
import {Body} from "../../core/Body";
import {TableSizeButton} from "../../core/button/TableSizeButton";
import {DeleteDeliveryInstruction} from "../../object/DeliveryInstruction/delivery-instruction-object";
import Swal from "sweetalert2";
import {Button} from "@material-ui/core";

type State = {
  selectedCheckBoxes: number[],
  tableSize: boolean,
  sizeUp: () => void,
  instructionModalOpen: boolean,
  deliveryProductModalOpen: boolean,
  changeInstructionModalStatus: () => void,
  changeDeliveryProductModalStatus: () => void,
  changeAmount: boolean,
  changeTarget: number,
  changeTargetNumber: (target: number) => void,
  changeAmountStatus: () => void,
  changeAmountStatusFalse: () => void
}

class ViewDeliveries extends Component<Props, State> {
  static contextType = DeliveriesContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedCheckBoxes: [],
      tableSize: true,
      sizeUp: () => {
        this.setState({tableSize: !this.state.tableSize})
      },
      instructionModalOpen: false,
      deliveryProductModalOpen: false,
      changeInstructionModalStatus: () => {
        this.setState({instructionModalOpen: !this.state.instructionModalOpen});
      },
      changeDeliveryProductModalStatus: () => {
        this.setState({deliveryProductModalOpen: !this.state.deliveryProductModalOpen});
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

  componentDidMount() {
    const state = this.context as DeliveriesState;
    state.cleanDelivery();
    state.getInitDelivery();
  }

  clearCheckBoxes = () => {
    this.setState({selectedCheckBoxes : []});
  }

  deleteSelectedCheckBox = () => {
    const state = this.context as DeliveriesState;
    this.state.selectedCheckBoxes.forEach(productNo => {
      const index = state.delivery.instructions.findIndex(instruction =>
        instruction.productNo === productNo);
      if(index !== -1) {
        const deleteDeliveryInstruction = {
          deliveryNo: state.delivery.deliveryNo,
          instructionNo: state.delivery.instructions[index].instructionNo,
          productNo: productNo,
        } as DeleteDeliveryInstruction;

        state.deleteDeliveryInstruction(deleteDeliveryInstruction);
      }
    });
    this.setState({selectedCheckBoxes: []});
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
      const {selectedCheckBoxes} = prevState;
      const isProductNoChecked = selectedCheckBoxes.includes(productNo);
      if(isProductNoChecked) {
        updatedChecks = selectedCheckBoxes.filter(num => num !== productNo);
      }else{
        updatedChecks = [...selectedCheckBoxes, productNo];
      }
      return {
        ...prevState,
        selectedCheckBoxes: updatedChecks,
      };
    });
  };

  existSelectedCheckBox = (productNo: number) => {
    const productNoString = String(productNo);
    return this.state.selectedCheckBoxes.filter((num) => num === productNo).length > 0;
  }

  render() {
    const {selectedCheckBoxes} = this.state;
    let isChecksNotEmpty = selectedCheckBoxes.length != 0;

    return (
        <Layout>
          <Title title='출고현황'/>
          <Body>
            <SearchBox minWidth='1100px'>
              <SearchDeliveryBar/>
            </SearchBox>
            <TableBox minWidth='1100px' minHeight='650px'>
              <ViewDeliveryListTable tableSize={this.state.tableSize}
                                     tableSizeUp={this.state.sizeUp}
                                     changeAmountStatusFalse={this.state.changeAmountStatusFalse}
                                     clearCheckBoxes={this.clearCheckBoxes}/>
              <div style={{textAlign: 'center'}}>
                <TableSizeButton tableSize={this.state.tableSize} tableSizeUp={this.state.sizeUp}/>
              </div>
              <ViewDeliveryTable
                  tableSize={this.state.tableSize}
                  instructionModalOpen={this.state.instructionModalOpen}
                  deliveryProductModalOpen={this.state.deliveryProductModalOpen}
                  changeInstructionModalStatus={this.state.changeInstructionModalStatus}
                  changeDeliveryProductModalStatus={this.state.changeDeliveryProductModalStatus}
                  changeAmount={this.state.changeAmount}
                  changeAmountStatus={this.state.changeAmountStatus}
                  tableSizeUp={this.state.sizeUp}
                  changeTarget={this.state.changeTarget}
                  changeTargetNumber={this.state.changeTargetNumber}
                  existSelectedCheckBox={this.existSelectedCheckBox}
                  addSelectedCheckBox={this.addSelectedCheckBox}
                  clearCheckBoxes={this.clearCheckBoxes}
                  delivery={this.context.delivery}
              />
            </TableBox>
          </Body>
          {isChecksNotEmpty &&
              <div className='delete-div' style={{
                height: '7vh', margin: 0
              }}>
                <div>
                  <span
                      style={{color: '#1ae0ed'}}>{selectedCheckBoxes.length}건 </span><span>선택됨</span>
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

export default ViewDeliveries;