import {Component} from "react";
import '../core.css';

type SearchBoxProps = {
  p?: string;
  minWidth? : string
}

export class SearchBox extends Component<SearchBoxProps> {
  render() {
    const {p, minWidth} = this.props;

    return (
        <div className='search-box' style={{
          padding: p ? p : '5px',
          minWidth: minWidth
        }}>
          {this.props.children}
        </div>
    );
  }
}