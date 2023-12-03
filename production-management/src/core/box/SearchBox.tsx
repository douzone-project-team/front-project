import {Component} from "react";
import '../core.css';

export class SearchBox extends Component {
  render() {
    return (
        <div className='search-box'>
          {this.props.children}
        </div>
    );
  }
}