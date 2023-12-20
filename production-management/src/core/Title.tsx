import {Component} from "react";
import "./core.css";

type TopTitleProps = {
  title: string
  minWidth?: string
}

export class Title extends Component<TopTitleProps> {
  render() {
    const {title, minWidth} = this.props;

    return (
        <div className='main-title' style={{minWidth : minWidth ? minWidth : '1150px'}}>
          <span style={{fontSize: '20px', fontWeight: 'bold'}}>{title}</span>
          {this.props.children}
        </div>
    );
  }
}