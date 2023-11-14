import {Component} from "react";
import AddInstructionBar from "../../components/Instruction/AddInstructionBar";
import AddInstructionTable from "../../components/Instruction/AddInstructionTable";
import {Box} from "@material-ui/core";
import Layout from "../../Layout"
import { withStyles, WithStyles } from '@material-ui/core/styles';


class AddInstructions extends Component {

  render() {
    return (
        // @ts-ignore
        <Layout>
          <Box
              sx={{
                width: '145vh',
                height: '1.5vh',
                pt: '1vh',
                pl: '1.5vh',
                pb: '3vh',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '1.7vh', fontWeight: 'bold'}}>지시등록</span>
          </Box>
          <Box
              sx={{
                width: '145vh',
                p: '1.5vh',
                border: '1px solid #D3D3D3'
              }}
          >
            <AddInstructionBar/>
            <AddInstructionTable/>
          </Box>
        </Layout>
    )
  }
}

export default AddInstructions;