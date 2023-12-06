import {Component} from "react";
import '../core.css';

type SearchButtonProps = {
  onClick: () => void,
  size?: number
}

/**
 * 검색 버튼
 *
 * onClick: () => void | 검색 원클릭 이벤트 메서드
 */
export class SearchButton extends Component<SearchButtonProps> {
  render() {
    const {onClick, size} = this.props;

    return (
        <img src={require('../../images/button/search-button.png')}
             className='cellHoverEffect' style={{width: size ? size + 'px' : '15px'}}
             onClick={onClick}/>
    );
  }
}