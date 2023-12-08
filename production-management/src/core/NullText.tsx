import { Component } from "react";

export class NullText extends Component {
  render() {
    return (
        <div style={{fontFamily: 'S-CoreDream-3Light',textAlign:'center', marginTop: '50px'}}>
          조회가능한 데이터가 없습니다.
        </div>
    );
  }
}