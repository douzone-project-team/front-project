import {Component} from "react";
import '../core.css';

type AddButtonProps = {
  onClick: () => void
  size?: number
  mt?: string
}

/**
 * 추가 버튼
 * onClick: () => void | 추가 메서드
 */
export class AddButton extends Component<AddButtonProps> {
  render() {
    const {onClick, size, mt} = this.props;

    return (
        <img src={require('../../images/button/add-button.png')}
             className='cellHoverEffect' style={{marginTop : mt, width: size ? size + 'px' : '15px', height: size ? size + 'px' : '15px'}}
             onClick={onClick}/>
    );
  }
}