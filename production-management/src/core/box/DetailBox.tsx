import { Component } from "react";
import "../core.css";

export class DetailBox extends Component {
  render() {
    return (
        <div className="detail-box">
          {this.props.children}
        </div>
    );
  }
}