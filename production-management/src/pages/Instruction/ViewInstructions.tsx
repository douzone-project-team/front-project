import {Box} from "@material-ui/core";
import {Component} from "react";
import SearchInstructionBar from "../../components/Instruction/SearchInstructionBar";
import ViewInstructionListTable from "../../components/Instruction/ViewInstructionListTable";
import ViewInstructionTable from "../../components/Instruction/ViewInstructionTable";
import Layout from "../../common/Layout";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";

type State = {
  tableSize: boolean,
  sizeUp: () => void,
  productModalOpen: boolean,
  customerModalOpen: boolean,
  changeProductModalStatus: () => void,
  changeCustomerModalStatus: () => void,
  changeAmount: boolean,
  changeAmountStatus: () => void,
  changeAmountStatusFalse: () => void,
}

class ViewInstructions extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
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
      changeAmountStatus: () => {
        this.setState({changeAmount: !this.state.changeAmount});
      },
      changeAmountStatusFalse: () => {
        this.setState({changeAmount: false});
      }
    }
  }

  static contextType = InstructionsContext;

  componentDidMount() {
    const state = this.context as InstructionsState;
    state.cleanInstruction();
  }

  render() {
    return (
        // @ts-ignore
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
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>지시현황</span>
          </Box>
          <Box
              sx={{
                width: '95%',
                p: '15px',
                ml: '50px',
                border: '1px solid #D3D3D3',
              }}
          >
            <SearchInstructionBar/>
            <ViewInstructionListTable tableSize={this.state.tableSize}
                                      changeAmountStatusFalse={this.state.changeAmountStatusFalse}/>
            <div style={{textAlign: 'center'}}>
              <img
                  src={require(this.state.tableSize ? './../../images/button/table-size-bar-up.png' : './../../images/button/table-size-bar-down.png')}
                  onClick={this.state.sizeUp}
                  style={{cursor: 'pointer'}}
                  alt={this.state.tableSize ? 'Up Arrow' : 'Down Arrow'
                  }
              />
            </div>
            <ViewInstructionTable tableSize={this.state.tableSize}
                                  productModalOpen={this.state.productModalOpen}
                                  customerModalOpen={this.state.customerModalOpen}
                                  changeProductModalStatus={this.state.changeProductModalStatus}
                                  changeCustomerModalStatus={this.state.changeCustomerModalStatus}
                                  changeAmount={this.state.changeAmount}
                                  changeAmountStatus={this.state.changeAmountStatus}
            />
          </Box>
        </Layout>
    )
  }
}

export default ViewInstructions;