import {Component} from "react";
import {DeliveriesContext, Props} from "../../store/Delivery/deliveries-context";
import Layout from "../../common/Layout";
import {Button} from "@material-ui/core";
import AddDeliveryBar from "../../components/Delivery/AddDeliveryBar";
import AddDeliveryTable from "../../components/Delivery/AddDeliveryTable";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {
  DeleteDeliveryInstruction
} from "../../object/DeliveryInstruction/delivery-instruction-object";
import {SearchBox} from "../../core/box/SearchBox";
import {Title} from "../../core/Title";
import {TableBox} from "../../core/box/TableBox";
import { Body } from "../../core/Body";
import Swal from "sweetalert2";

type State = {
  selectedCheckBoxes: number[],
  instructionModalOpen: boolean,
  deliveryProductModalOpen: boolean,
  changeInstructionModalStatus: () => void,
  changeDeliveryProductModalStatus: () => void,
}

class AddDeliveries extends Component<Props, State> {
  static contextType = DeliveriesContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCheckBoxes: [],
      instructionModalOpen: false,
      deliveryProductModalOpen: false,
      changeInstructionModalStatus: () => {
        this.setState({instructionModalOpen: !this.state.instructionModalOpen});
      },
      changeDeliveryProductModalStatus: () => {
        this.setState({deliveryProductModalOpen: !this.state.deliveryProductModalOpen});
      }
    }
  }

  componentDidMount() {
    const state = this.context as DeliveriesState;
    state.cleanDelivery()
  }

  deleteSelectedCheckBox = () => {
    const state = this.context as DeliveriesState;
    this.state.selectedCheckBoxes.forEach(productNo => {
      const index = state.delivery.instructions.findIndex(instruction =>
          instruction.productNo === productNo);
      if (index !== -1) {
        const deleteDeliveryInstruction = {
          deliveryNo: state.delivery.deliveryNo,
          instructionNo: state.delivery.instructions[index].instructionNo,
          productNo: productNo,
        } as DeleteDeliveryInstruction;

        state.deleteDeliveryInstruction(deleteDeliveryInstruction);
      }
    });
    this.setState({selectedCheckBoxes: []})
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
      if (isProductNoChecked) {
        updatedChecks = selectedCheckBoxes.filter(num => num !== productNo);
      } else {
        updatedChecks = [...selectedCheckBoxes, productNo];
      }
      return {
        ...prevState,
        selectedCheckBoxes: updatedChecks,
      };
    });
  };

  existSelectedCheckBox = (productNo: number) => {
    return this.state.selectedCheckBoxes.filter((num) => num === productNo).length > 0;
  }

  render() {
    const {
      selectedCheckBoxes,
      instructionModalOpen,
      deliveryProductModalOpen
    } = this.state;
    let isChecksNotEmpty = selectedCheckBoxes.length != 0;

    return (
        <Layout>
          <Title title='출고등록'/>
          <Body>
            <SearchBox minWidth='1100px'>
              <AddDeliveryBar/>
            </SearchBox>
            <TableBox minWidth='1100px'>
              <AddDeliveryTable addSelectedCheckBox={this.addSelectedCheckBox}
                                instructionModalOpen={instructionModalOpen}
                                deliveryProductModalOpen={deliveryProductModalOpen}
                                changeInstructionModalStatus={this.state.changeInstructionModalStatus}
                                changeDeliveryProductModalStatus={this.state.changeDeliveryProductModalStatus}
                                existSelectedCheckBox={this.existSelectedCheckBox}/>
            </TableBox>
          </Body>
          {isChecksNotEmpty &&
              <div className='delete-div'>
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

export default AddDeliveries;