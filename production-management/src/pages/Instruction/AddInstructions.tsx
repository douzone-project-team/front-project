import {Component} from "react";
import AddInstructionBar from "../../components/Instruction/AddInstructionBar";
import AddInstructionTable from "../../components/Instruction/AddInstructionTable";
import {Box, Button} from "@material-ui/core";
import Layout from "../../common/Layout";
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {DeleteProductInstruction} from "../../object/ProductInstruction/product-instruction-object";
import "../../assets/css/Styles.css";


type State = {
  selectedCheckBoxs: number[],
  productModalOpen: boolean,
  customerModalOpen: boolean,
  customerSearchModalOpen: boolean,
  changeProductModalStatus: () => void,
  changeCustomerModalStatus: () => void,
  changeCustomerSearchModalStatus: () => void,
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
      }
    }
  }

  componentDidMount() {
    const state = this.context as InstructionsState;
    state.cleanInstruction();
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
    this.setState({selectedCheckBoxs: []})
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

  render() {
    const {
      selectedCheckBoxs,
      productModalOpen,
      customerModalOpen,
      customerSearchModalOpen
    } = this.state;
    let isChecksNotEmpty = selectedCheckBoxs.length != 0;

    return (
        // @ts-ignore
        <Layout>
          <Box
              sx={{
                width: '100%',
                mb: '2vh',
                pt: '80px',
                pl: '15px',
                bgcolor: '#3C50C2',
                color: 'white',
                height: '12.5vh',
              }}
          >
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>지시등록</span>
          </Box>
          <Box
              sx={{
                width: '95%',
                pl: '15px',
                pt: '15px',
                pr: '15px',
                ml: '50px',
                mb: '3vh',
                bgcolor: 'white',
                boxShadow: '0px 0px 5px 1px #DDDDDD',
                borderRadius: '10px',
                height: '7.5vh'
              }}
          >
            <AddInstructionBar customerSearchModalOpen={customerSearchModalOpen}
                               changeCustomerSearchModalStatus={this.state.changeCustomerSearchModalStatus}/>
          </Box>
          <Box
              sx={{
                width: '95%',
                p: '15px',
                ml: '50px',
                bgcolor: 'white',
                boxShadow: '0px 0px 5px 1px #DDDDDD',
                borderRadius: '10px',
                height: '68vh'
              }}
          >
            <AddInstructionTable addSelectedCheckBox={this.addSelectedCheckBox}
                                 productModalOpen={productModalOpen}
                                 customerModalOpen={customerModalOpen}
                                 changeProductModalStatus={this.state.changeProductModalStatus}
                                 changeCustomerModalStatus={this.state.changeCustomerModalStatus}
                                 existSelectedCheckBox={this.existSelectedCheckBox}
            />
          </Box>
          {isChecksNotEmpty &&
              <div className='delete-div' style={{
                height: '7vh'
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