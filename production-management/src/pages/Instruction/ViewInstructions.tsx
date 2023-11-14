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
                width: '145vh',
                height: '1.5vh',
                pt: '1vh',
                pl: '1.5vh',
                pb: '3vh',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '1.7vh', fontWeight: 'bold'}}>지시현황</span>
          </Box>
          <Box
              sx={{
                width: '145vh',
                p: '1.5vh',
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