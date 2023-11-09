import React, {Component} from "react";
import ViewTable from "../../components/Product/ViewTable";
import ProductSearchBar from "../../components/Product/ProductSearchBar";

class ViewProducts extends Component {
  render() {
    return (
        <>
          <ProductSearchBar/>
          <ViewTable/>
        </>
    )
  }
}

export default ViewProducts;
