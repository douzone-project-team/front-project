import {Component} from "react";
import "../core.css";

type TableBoxProps = {
  p?: string,
  minWidth?: string,
  minHeight?: string,
  height?: string
}

export class TableBox extends Component<TableBoxProps> {
  render() {
    const {p, minWidth, minHeight, height} = this.props;

    return (
        <div className='table-box' style={{
          padding: p ? p : '20px',
          minWidth: minWidth,
          minHeight: minHeight,
          height: height ? height : '100%'
        }}>
          {this.props.children}
        </div>
    );
  }
}