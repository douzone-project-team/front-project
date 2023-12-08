import {Component} from "react";

type NullTextProps = {
  mt?: string
}

export class NullText extends Component<NullTextProps> {
  render() {
    const {mt} = this.props;

    return (
        <div style={{fontFamily: 'S-CoreDream-3Light', textAlign: 'center', marginTop: mt ? mt : '50px', fontSize: '16px'}}>
          조회가능한 데이터가 없습니다.
        </div>
    );
  }
}