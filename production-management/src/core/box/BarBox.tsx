import {Component} from "react";
import './../core.css';


export class BarBox extends Component {
  render() {
    return (
        <div className="bar-box">
          {this.props.children}
        </div>
    );
  }
}

type BarLeftBoxProps = {
  width: string
}

export class BarLeftBox extends Component<BarLeftBoxProps> {
  render() {
    const { width } = this.props;
    return (
        <div style={{width: width, marginBottom: '7px', marginTop: '7px'}}>
          {this.props.children}
        </div>
    );
  }
}

export class BarRightBox extends Component {
  render() {
    return (
        <div style={{marginRight: '1.5%', marginTop: '7px'}}>
          {this.props.children}
        </div>
    );
  }
}