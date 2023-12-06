import {Component} from "react";
import "./core.css";

type TopTitleProps = {
  title: string
}

export class Title extends Component<TopTitleProps> {
  render() {
    const {title} = this.props;

    return (
        <div className='main-title'>
          <span style={{fontSize: '17px', fontWeight: 'bold'}}>{title}</span>
          {this.props.children}
        </div>
    );
  }
}