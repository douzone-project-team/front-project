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

type State = {
  tableSize: boolean,
  sizeUp: () => void,
  instructionModalOpen: boolean,
  deliveryProductModalOpen: boolean,
  changeInstructionModalStatus: () => void,
  changeDeliveryProductModalStatus: () => void,
  changeAmount: boolean,
  changeAmountStatus: () => void,
  changeAmountStatusFalse: () => void
}

class ViewDeliveries extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
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
      changeAmountStatus: () => {
        this.setState({changeAmount: !this.state.changeAmount});
      },
      changeAmountStatusFalse: () => {
        this.setState({changeAmount: false});
      }
    }
  }

  static contextType = DeliveriesContext;

  componentDidMount() {
    const state = this.context as DeliveriesState;
    state.cleanDelivery();
  }

  render() {
    return (
        <Layout>
          <Title title='출고현황'/>
          <Body>
            <SearchBox>
              <SearchDeliveryBar/>
            </SearchBox>
            <TableBox>
              <ViewDeliveryListTable tableSize={this.state.tableSize}
                                     changeAmountStatusFalse={this.state.changeAmountStatusFalse}/>
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
                  changeAmountStatus={this.state.changeAmountStatus}/>
            </TableBox>
          </Body>
        </Layout>
    )
  }
}

export default ViewDeliveries;