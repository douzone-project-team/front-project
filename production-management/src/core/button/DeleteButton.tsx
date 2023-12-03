import {Component} from "react";
import "../core.css";

type DeleteButtonProps = {
  onClick: () => void
  size?: number
}

/**
 * 삭제 버튼
 * onClick: () => void | 삭제 메서드
 */
export class DeleteButton extends Component<DeleteButtonProps> {
  render() {
    const {onClick, size} = this.props;

    return (
        <img src={require('../../images/button/delete-button.png')}
             className='cellHoverEffect' style={{width: size ? size + 'px' : '15px'}}
             onClick={onClick}/>
    );
  }
}