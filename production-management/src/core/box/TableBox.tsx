import {Component} from "react";
import "../core.css";

export class TableBox extends Component {
  render() {
    return (
        <div className='table-box'>
          {this.props.children}
        </div>
    );
  }
}