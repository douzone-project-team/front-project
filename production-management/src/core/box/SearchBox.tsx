import {Component} from "react";
import '../core.css';

type SearchBoxProps = {
  p?: string;
}

export class SearchBox extends Component<SearchBoxProps> {
  render() {
    const {p} = this.props;

    return (
        <div className='search-box' style={{padding: p ? p : '5px'}}>
          {this.props.children}
        </div>
    );
  }
}