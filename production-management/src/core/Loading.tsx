import {Component} from "react";
import './core.css';

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  marginTop: '80px',
  backgroundColor:'white'
}

export class Loading extends Component {
  render() {
    return (
        <div style={divStyle}>
          <div className="loadingio-spinner-spinner-7aq7hbbxxx">
            <div className="ldio-te6fulodm4">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
    );
  }
}