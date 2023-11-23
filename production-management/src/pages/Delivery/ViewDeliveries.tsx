import {Box} from "@material-ui/core";
import {Component} from "react";
import ViewDeliveryListTable from "../../components/Delivery/ViewDeliveryListTable";
import Layout from "../../common/Layout";
import SearchDeliveryBar from "../../components/Delivery/SearchDeliveryBar";
import ViewDeliveryTable from "../../components/Delivery/ViewDeliveryTable";
import {DeliveriesContext, Props} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";

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
                this.setState({tableSize:!this.state.tableSize})
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
                this.setState({changeAmount: !this.state.changeAmountStatus});
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
          <Box
              sx={{
                width: '95%',
                height: '15px',
                mt: '100px',
                ml: '50px',
                pt: '10px',
                pl: '15px',
                pb: '30px',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>출고현황</span>
          </Box>
          <Box
              sx={{
                width: '95%',
                p: '15px',
                ml: '50px',
                border: '1px solid #D3D3D3'
              }}
          >
                <SearchDeliveryBar/>
                <ViewDeliveryListTable tableSize={this.state.tableSize}/>
                <div style={{textAlign: 'center'}}>
                    <img
                        src={require(this.state.tableSize ? './../../images/button/table-size-bar-up.png' : './../../images/button/table-size-bar-down.png')}
                        onClick={this.state.sizeUp}
                        style={{cursor: 'pointer'}}
                        alt={this.state.tableSize ? 'Up Arrow' : 'Down Arrow'
                        }
                    />
                </div>
                <ViewDeliveryTable
                    tableSize={this.state.tableSize}
                    instructionModalOpen={this.state.instructionModalOpen}
                    deliveryProductModalOpen={this.state.deliveryProductModalOpen}
                    changeInstructionModalStatus={this.state.changeInstructionModalStatus}
                    changeDeliveryProductModalStatus={this.state.changeDeliveryProductModalStatus}
                    changeAmount={this.state.changeAmount}
                    changeAmountStatus={this.state.changeAmountStatus}/>
          </Box>
        </Layout>
    )
  }
}

export default ViewDeliveries;