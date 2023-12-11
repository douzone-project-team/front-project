import React, {ChangeEvent, Component, FocusEvent} from 'react';
import './../../assets/css/Styles.css';

type DateInputProps = {
  title: string
  startDate: {
    datalaceholder: string,
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
  }
  endDate?: {
    datalaceholder: string,
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
  }
}

type DateInputState = {
  start: string,
  end: string
}

const inputStyle = {
  height: '30px',
  marginLeft: '10px',
  width: '115px',
  fontFamily: 'S-CoreDream-3Light',
  fontSize: '14px',
  lineHeight: '40px'
};

const labelStyle = {
  marginLeft: '60px',
  marginRight: '5px',
  fontSize: '17px',
  fontWeight: 'bold',
  fontFamily: 'S-CoreDream-3Light',
  lineHeight: '40px'
};

export class DateInput extends Component<DateInputProps, DateInputState> {
  constructor(props: DateInputProps) {
    super(props);

    this.state = {
      start: '',
      end: ''
    }
  }

  render() {
    const {title, startDate, endDate} = this.props;
    const {start, end} = this.state;

    return (
        <label>
          <span style={labelStyle}>{title}</span>
          <input type="date"
                 style={{
                   ...inputStyle, color: start? 'black' : '#868e96'
                 }}
                 data-placeholder={startDate.datalaceholder}
                 required={startDate.required}
                 aria-required="true"
                 onChange={(e) => {
                   startDate.onChange(e);
                   this.setState({start: e.target.value});
                 }}
                 max={end}
          />
          {endDate ? <span>&nbsp;&nbsp;~</span> : null}
          {endDate ?
              <input type="date"
                     style={{
                       ...inputStyle, color: end? 'black' : '#868e96'
                     }}
                     data-placeholder={endDate.datalaceholder}
                     required={endDate.required}
                     aria-required="true"
                     onChange={(e) => {
                       endDate.onChange(e);
                       this.setState({end: e.target.value})
                     }}
                     min={start}
              /> : null}
        </label>
    );
  }
}