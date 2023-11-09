import {Component} from "react";
import {ProductsState} from "../../object/Product/product-object";

class EditTable extends Component {


  render() {
    let context = this.context as ProductsState;
    console.log(context.product);
    return (
        <div>

        </div>
    );
  }
}

export default EditTable;