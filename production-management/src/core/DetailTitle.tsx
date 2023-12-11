import {Component} from "react";

type DetailTitleProps = {
  options: {
    status?: string,
    title: string,
    targetName?: string
  }
}

const div = {
  display: 'flex',
  alignItems: 'center',
  height: '16px'
};

const spanTitle = {
  fontWeight: 'bold',
  fontSize: '19px',
  lineHeight: '16px',
  marginLeft: '10px',
};

const spanStatus = {
  lineHeight: '16px',
  width: '180px',
  marginLeft: '10px',
  fontSize: '17px',
  padding: '2px'
};

const img = {
  width: '16px',
  height: '16px'
};

export class DetailTitle extends Component<DetailTitleProps> {

  render() {

    const {status, title, targetName} = this.props.options;

    return (
        <div style={div}>
          <img src={require('./../images/icon/detail.png')} style={img}/>
          <span style={spanTitle}>{title}</span>
          {targetName ?
              <span className={status ? status : ''} style={spanStatus}>{targetName}</span> :
              <span style={spanStatus}>{targetName == '0' ? null : targetName}</span>}
        </div>
    );
  }
}