import {Component} from "react";
import '../core.css';

type AddItemButtonProps = {
  onClick: () => void
  color?: string
  size?: number
  mt? : string
}

export class AddItemButton extends Component<AddItemButtonProps> {
  render() {
    const {onClick, color, size, mt} = this.props;
    let png = 'add-item-button.png';
    if (color) {
      png = 'add-item-button-' + color + '.png';
    }

    return (
        <img src={require(`../../images/button/` + png)}
             className='cellHoverEffect' style={{width: size ? size + 'px' : '15px', marginTop: mt}}
             onClick={onClick}/>
    );
  }
}