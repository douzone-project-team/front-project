import React, {ChangeEvent, Component} from 'react';
import './../../assets/css/Styles.css';

type DateInputProps = {
  title: string
  darkMode?: boolean
  startDate: {
    datalaceholder: string,
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    defaultValue?: string
  }
  endDate?: {
    datalaceholder: string,
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    defaultValue?: string
  }
}

type DateInputState = {
  start: string,
  end: string
}

const inputStyle = {
  height: '30px',
  marginLeft: '10px',
  fontFamily: 'S-CoreDream-3Light',
  fontSize: '15px',
  lineHeight: '40px'
};

const labelStyle = {
  marginLeft: '30px',
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
    const {title, startDate, endDate, darkMode} = this.props;
    const {start, end} = this.state;
    if(this.state.start === '') {
      this.setState({start: startDate.defaultValue as string, end: endDate?.defaultValue as string})
    }

    return (
        <label>
          <span style={labelStyle}>{title}</span>
          <input type="date"
                 style={{
                   ...inputStyle, color: start ? 'black' : '#868e96',
                   background: 'url(' + require(darkMode ? `../../images/button/date-button-black.png` : `../../images/button/date-button.png`) + ')' + ' no-repeat right 5px center / 16px auto'
                 }}
                 data-placeholder={startDate.datalaceholder}
                 required={startDate.required}
                 aria-required="true"
                 onChange={(e) => {
                   startDate.onChange(e);
                   this.setState({start: e.target.value});
                 }}
                 defaultValue={startDate.defaultValue}
              // value={startDate.defaultValue}
                 max={end}
          />
          {endDate ? <span>&nbsp;&nbsp;~</span> : null}
          {endDate ?
              <input type="date"
                     style={{
                       ...inputStyle, color: end ? 'black' : '#868e96',
                       background: 'url(' + require(darkMode ? `../../images/button/date-button-black.png` : `../../images/button/date-button.png`) + ')' + ' no-repeat right 5px center / 16px auto'
                     }}
                     data-placeholder={endDate.datalaceholder}
                     required={endDate.required}
                     aria-required="true"
                     onChange={(e) => {
                       endDate.onChange(e);
                       this.setState({end: e.target.value})
                     }}
                     defaultValue={endDate.defaultValue}
                  // value={endDate.defaultValue}
                     min={start}
              /> : null}
        </label>
    );
  }
}