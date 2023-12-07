import React, {Component} from "react";
import ViewProductListTable from "../../components/Product/ViewProductListTable";
import Layout from "../../common/Layout";
import ViewProductTable from "../../components/Product/ViewProductTable";
import SearchProductBar from "../../components/Product/SearchProductBar";
import {Title} from "../../core/Title";
import {SearchBox} from "../../core/box/SearchBox";
import {Body} from "../../core/Body";
import {TableBox} from "../../core/box/TableBox";
import { ProductsContext } from "../../store/Product/products-context";
import { ProductsState } from "../../object/Product/product-object";

class ViewProducts extends Component {

  static contextType = ProductsContext;

  componentDidMount = async () => {
    const state = this.context as ProductsState;
    await state.cleanProduct();
    state.getInitProduct();
  }

  render() {
    return (
        <Layout>
          <Title title='품목 현황'/>
          <Body>
            <SearchBox>
              <SearchProductBar/>
            </SearchBox>
            <TableBox>
              <ViewProductListTable/>
              <ViewProductTable/>
            </TableBox>
          </Body>
        </Layout>
    )
  }
}

export default ViewProducts;
