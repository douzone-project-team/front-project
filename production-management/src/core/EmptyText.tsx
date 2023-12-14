import {Component} from "react";

type EmptyTextProps = {
  mt?: string
}

export class EmptyText extends Component<EmptyTextProps> {
  render() {
    const {mt} = this.props;

    return (
        <div style={{fontFamily: 'S-CoreDream-3Light', textAlign: 'center', marginTop: mt ? mt : '50px', fontSize: '16px'}}>
          조회된 데이터가 없습니다.
        </div>
    );
  }
}