import {Component} from "react";
import "./core.css";

export class Body extends Component {
  render() {
    return (
        <div className='main-body'>
          {this.props.children}
        </div>
    );
  }
}