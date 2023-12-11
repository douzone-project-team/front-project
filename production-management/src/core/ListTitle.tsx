import {Component} from "react";

type ListTitleProps = {
  options: {
    title: string,
    count?: number
  }
}

const div = {
  display: 'flex',
  alignItems: 'center',
  height: '16px',
  marginBottom: '15px'
};

const spanTitle = {
  fontWeight: 'bold',
  fontSize: '19px',
  lineHeight: '16px',
  marginLeft: '10px',
};

const spanCount = {
  color: 'rgb(60, 80, 194)',
  fontSize: '15px',
  lineHeight: '16px',
};

const img = {
  width: '19px',
  height: '19px'
};

export class ListTitle extends Component<ListTitleProps> {

  render() {
    const {title, count} = this.props.options;

    return (
        <div style={div}>
          <img src={require('../images/icon/list.png')} style={img}/>
          <span style={spanTitle}> {title}&nbsp;&nbsp;
            {count ? <span style={spanCount}>&nbsp;{count}&nbsp;<span style={{color: 'gray'}}>건</span></span> : null}
          </span>
        </div>
    );
  }
}