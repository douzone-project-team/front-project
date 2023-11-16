import {Box} from "@material-ui/core";
import {Component} from "react";
import ViewDeliveryListTable from "../../components/Delivery/ViewDeliveryListTable";
import Layout from "../../common/Layout";
import SearchDeliveryBar from "../../components/Delivery/SearchDeliveryBar";
import ViewDeliveryTable from "../../components/Delivery/ViewDeliveryTable";

class ViewDeliveries extends Component {

  render() {
    return (
        <Layout>
          <Box
              sx={{
                width: '1450',
                height: '15px',
                  marginTop: '100px',
                pt: '10px',
                p: '15px',
                border: '1px solid #D3D3D3',
              }}
          >
            <span style={{fontSize: '17px', fontWeight: 'bold'}}>출고현황</span>
          </Box>
          <Box
              sx={{
                width: '1450px',
                p: '15px',
                border: '1px solid #D3D3D3'
              }}
          >
                <SearchDeliveryBar/>
                <ViewDeliveryListTable/>
                <ViewDeliveryTable/>
          </Box>
        </Layout>
    )
  }
}

export default ViewDeliveries;