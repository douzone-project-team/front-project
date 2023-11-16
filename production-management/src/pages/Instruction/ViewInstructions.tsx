import {Box} from "@material-ui/core";
import {Component} from "react";
import SearchInstructionBar from "../../components/Instruction/SearchInstructionBar";
import ViewInstructionListTable from "../../components/Instruction/ViewInstructionListTable";
import ViewInstructionTable from "../../components/Instruction/ViewInstructionTable";
import Layout from "../../Layout"

class ViewInstructions extends Component {

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
                border: '1px solid #D3D3D3'
              }}
          >
            <SearchInstructionBar/>
            <ViewInstructionListTable/>
            <ViewInstructionTable/>
          </Box>
        </Layout>
    )
  }
}

export default ViewInstructions;