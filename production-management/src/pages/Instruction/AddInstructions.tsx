import {Component} from "react";
import AddInstructionBar from "../../components/Instruction/AddInstructionBar";
import AddInstructionTable from "../../components/Instruction/AddInstructionTable";
import {Box} from "@material-ui/core";

class AddInstructions extends Component {

  render() {
    return (
        <>
          <Box
              sx={{
                width: '125vh',
                height: '1.5vh',
                ml: '10vh', // 왼쪽 마진
                mt: '5vh', // 상단 마진
                pt: '1vh',
                p: '1.5vh',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '1.7vh', fontWeight: 'bold'}}>지시등록</span>
          </Box>
          <Box
              sx={{
                width: '125vh',
                ml: '10vh', // 왼쪽 마진
                p: '1.5vh',
                border: '1px solid #D3D3D3'
              }}
          >
            <AddInstructionBar/>
            <AddInstructionTable/>
          </Box>
        </>
    )
  }
}

export default AddInstructions;