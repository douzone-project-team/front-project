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
  minWidth?: string
}

export class BarLeftBox extends Component<BarLeftBoxProps> {
  render() {
    const { width, minWidth } = this.props;
    return (
        <div style={{width: width, minWidth : minWidth, marginBottom: '7px', marginTop: '7px'}}>
          {this.props.children}
        </div>
    );
  }
}
type BarRightBoxProps = {
  minWidth?: string
}

export class BarRightBox extends Component<BarRightBoxProps> {
  render() {
    const { minWidth } = this.props;
    return (
        <div style={{marginRight: '1.5%', minWidth : minWidth, marginTop: '14px'}}>
          {this.props.children}
        </div>
    );
  }
}