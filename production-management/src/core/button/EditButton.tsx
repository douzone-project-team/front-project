import {Component} from "react";
import '../core.css';

type EditButtonProps = {
  onClick: () => void
  color?: string
  size?: number
}

/**
 * 편집 및 모달 조회 버튼
 * onClick: () => void | 편집 및 모달 조회 메서드
 */
export class EditButton extends Component<EditButtonProps> {
  render() {
    const {onClick, color, size} = this.props;
    let png = 'modify-button.png';
    if (color) {
      png = 'modify-button-' + color + '.png';
    }
    return (
        <img src={require('../../images/button/' + png)}
             className='cellHoverEffect' style={{width: size ? size + 'px' : '15px'}}
             onClick={onClick}/>
    );
  }
}