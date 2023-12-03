import React, {Component, FocusEvent} from 'react';
import './../../assets/css/Styles.css';

type DateInputProps = {
  title: string
  startDate: {
    datalaceholder: string,
    onChange?: (evt: FocusEvent<HTMLInputElement>) => void,
    onBlur?: (evt: FocusEvent<HTMLInputElement>) => void,
    required?: boolean
  }
  endDate?: {
    datalaceholder: string,
    onChange?: (evt: FocusEvent<HTMLInputElement>) => void,
    onBlur?: (evt: FocusEvent<HTMLInputElement>) => void,
    required?: boolean
  }
}

const inputStyle = {height: '20px', marginLeft: '10px', width: '100px'};
const labelStyle = {marginLeft: '60px', marginRight: '5px', fontSize: '14px', fontWeight: 'bold'};

export class DateInput extends Component<DateInputProps> {
  render() {
    const {title, startDate, endDate} = this.props;
    return (
        <label>
          <span style={labelStyle}>{title}</span>
          <input type="date"
                 style={inputStyle}
                 data-placeholder={startDate.datalaceholder}
                 required={startDate.required}
                 aria-required="true"
                 onChange={startDate.onChange}
                 onBlur={startDate.onBlur}
          />
          {endDate ?
              <input type="date"
                     style={inputStyle}
                     data-placeholder={endDate.datalaceholder}
                     required={endDate.required}
                     aria-required="true"
                     onChange={endDate.onChange}
                     onBlur={endDate.onBlur}
              /> : null}
        </label>
    );
  }
}