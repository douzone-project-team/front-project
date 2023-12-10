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
import { Body } from "../../core/Body";
import { TableSizeButton } from "../../core/button/TableSizeButton";

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

  componentDidMount = async () => {
    const state = this.context as InstructionsState;
    await state.cleanInstruction();
    state.getInitInstruction();
  }

  render() {
    return (
        <Layout>
          <Title title='지시현황'/>
          <Body>
            <SearchBox minWidth='1100px'>
              <SearchInstructionBar/>
            </SearchBox>
            <TableBox minWidth='1100px'>
              <ViewInstructionListTable tableSize={this.state.tableSize}
                                        tableSizeUp={this.state.sizeUp}
                                        changeAmountStatusFalse={this.state.changeAmountStatusFalse}/>
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
              />
            </TableBox>
          </Body>
        </Layout>
    )
  }
}

export default ViewInstructions;