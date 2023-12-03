import {Component} from "react";
import './core.css';


export class BarBox extends Component {
  render() {
    return (
        <div className="bar-box">
          {this.props.children}
        </div>
    );
  }
}