import {Component} from "react";

type ListTitleProps = {
  options: {
    title: string,
    count: number
  }
}

const div = {
  display: 'flex',
  alignItems: 'center',
  height: '16px'
};

const spanTitle = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '16px',
  marginLeft: '10px'
};

const spanCount = {
  color: 'rgb(60, 80, 194)',
  fontSize: '13px',
  lineHeight: '16px',
};

const img = {
  width: '16px',
  height: '16px'
};

/**
 * 리시트 제목
 * 
 * title: string | 타이블 제목
 * count: number | 현재 페이지에 보이는 갯수
 */
export class ListTitle extends Component<ListTitleProps> {

  render() {
    const {title, count} = this.props.options;

    return (
        <div style={div}>
          <img src={require('../images/icon/list.png')} style={img}/>
          <span style={spanTitle}> {title}&nbsp;&nbsp;
            <span style={spanCount}>&nbsp;{count}&nbsp;<span style={{color: 'gray'}}>건</span></span>
          </span>
        </div>
    );
  }
}