import {Box} from '@material-ui/core';
import {Component} from "react";
import EditTable from "../../components/Product/EditTable";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {ProductPath} from "../../object/Product/product-object";

class EditProduct extends Component<RouteComponentProps> {

  render() {
    const {match} = this.props;
    const {productNo} = match.params as ProductPath;

    return (
        <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '1000px',
              overflow: 'auto',
            }}
        >
          <Box
              sx={{
                width: '1250px',
                height: '130px',
                ml: '100px',
                mt: '50px',
                p: 0.5,
                color: '#FFFFFF',
              }}
          >
            <EditTable/>
          </Box>
        </Box>
    );
  }
}

export default withRouter(EditProduct);