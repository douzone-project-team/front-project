import {Component} from "react";
import "../core.css";

type TableBoxProps = {
  p?: string,
  minWidth?: string,
}

export class TableBox extends Component<TableBoxProps> {
  render() {
    const {p, minWidth} = this.props;

    return (
        <div className='table-box' style={{
          padding: p ? p : '20px',
          minWidth: minWidth
        }}>
          {this.props.children}
        </div>
    );
  }
}