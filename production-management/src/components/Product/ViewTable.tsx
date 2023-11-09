import React, {Component} from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {ProductsContext} from "../../store/Product/products-context";
import {ProductsState} from "../../object/Product/product-object";

class ViewTable extends Component {
  static contextType = ProductsContext;

  componentDidMount() {
    console.log("call component did mount");
    const state = this.context as ProductsState;
    state.getProductList();
  }

  render() {
    const state = this.context as ProductsState;
    const list = state.productPage.list;

    const handleNextPage = () => {
      if (state.productPage.hasNextPage) {
        state.setPage(state.search.page + 1);
      }
    };

    const handlePrevPage = () => {
      if (state.productPage.hasPreviousPage) {
        state.setPage(state.search.page - 1);
      }
    };

    return (
        <Box
            sx={{
              width: '125vh',
              height: '13vh',
              ml: '10vh',
              mt: '5vh',
              p: 0.5,
              color: '#FFFFFF',
            }}
        >
          <TableContainer component={Paper}>
            <Table
                // sx={{minWidth: 650}}
                   aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">productNo</TableCell>
                  <TableCell align="right">productCode</TableCell>
                  <TableCell align="right">productName</TableCell>
                  <TableCell align="right">unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                    <TableRow
                        key={row.productNo}
                        // sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell align="right">{row.productNo}</TableCell>
                      <TableCell align="right">{row.productCode}</TableCell>
                      <TableCell align="right">{row.productName}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
            >
              {state.productPage.hasPreviousPage && (
                  <Button variant="outlined" onClick={handlePrevPage}>이전 페이지</Button>
              )}
              {state.productPage.hasNextPage && (
                  <Button variant="outlined" onClick={handleNextPage}>다음 페이지</Button>
              )}
            </Box>
          </TableContainer>
        </Box>
    );
  }
}

export default ViewTable;
