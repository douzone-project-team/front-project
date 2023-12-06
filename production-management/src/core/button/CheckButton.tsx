import {Component} from "react";
import '../core.css';

type CheckButtonProps = {
  onClick: () => void
  size?: number
}

export class CheckButton extends Component<CheckButtonProps> {
  render() {
    const {onClick, size} = this.props;

    return (
        <img src={require('../../images/icon/checked.png')}
             className='cellHoverEffect' style={{width: size ? size + 'px' : '15px'}}
             onClick={onClick}/>
    );
  }
}