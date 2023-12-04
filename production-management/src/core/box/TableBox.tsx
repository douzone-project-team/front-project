import {Component} from "react";
import "../core.css";

type TableBoxProps = {
  p?: string
}

export class TableBox extends Component<TableBoxProps> {
  render() {
    const {p} = this.props;

    return (
        <div className='table-box' style={{padding: p ? p : '30px'}}>
          {this.props.children}
        </div>
    );
  }
}