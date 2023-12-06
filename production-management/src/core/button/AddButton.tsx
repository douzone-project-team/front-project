import {Component} from "react";
import '../core.css';

type AddButtonProps = {
  onClick: () => void
  size?: number
}

/**
 * 추가 버튼
 * onClick: () => void | 추가 메서드
 */
export class AddButton extends Component<AddButtonProps> {
  render() {
    const {onClick, size} = this.props;

    return (
        <img src={require('../../images/button/add-button.png')}
             className='cellHoverEffect' style={{width: size ? size + 'px' : '15px'}}
             onClick={onClick}/>
    );
  }
}