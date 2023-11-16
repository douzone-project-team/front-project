import {Component} from "react";
import AddInstructionBar from "../../components/Instruction/AddInstructionBar";
import AddInstructionTable from "../../components/Instruction/AddInstructionTable";
import {Box, Button} from "@material-ui/core";
import Layout from "../../Layout"
import {InstructionsContext, Props} from "../../store/Instruction/Instructions-context";
import {InstructionsState} from "../../object/Instruction/Instruction-object";
import {DeleteProductInstruction} from "../../object/ProductInstruction/product-instruction-object";
import "../../assets/css/Styles.css";

type State = {
  selectedCheckBoxs: number[],
}

class AddInstructions extends Component<Props, State> {
  static contextType = InstructionsContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCheckBoxs: [],
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
  }

  render() {
    const {selectedCheckBoxs} = this.state;
    let isChecksNotEmpty = selectedCheckBoxs.length != 0;

    return (
        // @ts-ignore
        <Layout>
          <Box
              sx={{
                width: '95%',
                height: '5vh',
                ml: '50px',
                mt: '10vh',
                pt: '1vh',
                pl: '15px',
                pb: '30px',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>지시등록</span>
          </Box>
          <Box
              sx={{
                width: '95%',
                height: '78vh',
                ml: '50px',
                p: '15px',
                border: '1px solid #D3D3D3'
              }}
          >
            <AddInstructionBar/>
            <AddInstructionTable addSelectedCheckBox={this.addSelectedCheckBox}/>
            <div style={{height:'200px'}}></div>
          </Box>
          {isChecksNotEmpty &&
              <div className='delete-div'>
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