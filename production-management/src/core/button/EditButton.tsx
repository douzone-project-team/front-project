import {Component} from "react";
import '../core.css';

type EditButtonProps = {
  onClick: () => void
  color?: string
  size?: number
  mt?: string
}

/**
 * 편집 및 모달 조회 버튼
 * onClick: () => void | 편집 및 모달 조회 메서드
 */
export class EditButton extends Component<EditButtonProps> {
  render() {
    const {onClick, color, size, mt} = this.props;
    let png = 'modify-button.png';
    if (color) {
      png = 'modify-button-' + color + '.png';
    }
    return (
        <img src={require('../../images/button/' + png)}
             className='cellHoverEffect' style={{width: size ? size + 'px' : '15px', height: size ? size + 'px' : '15px', marginTop: mt}}
             onClick={onClick}/>
    );
  }
}