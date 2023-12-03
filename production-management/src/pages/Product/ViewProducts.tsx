import React, {Component} from "react";
import DetailView from "../../components/Product/DetailView";
import Layout from "../../common/Layout";
import ViewTable from "../../components/Product/ViewTable";
import ProductTopBar from "../../components/Product/ProductTopBar";
import {Title} from "../../core/Title";
import {SearchBox} from "../../core/box/SearchBox";
import {Body} from "../../core/Body";
import {TableBox} from "../../core/box/TableBox";

class ViewProducts extends Component {
  render() {
    return (
        <Layout>
          <Title title='품목 현황'/>
          <Body>
            <SearchBox>
              <ProductTopBar/>
            </SearchBox>
            <TableBox>
              <ViewTable/>
              <DetailView/>
            </TableBox>
          </Body>
        </Layout>
    )
  }
}

export default ViewProducts;
