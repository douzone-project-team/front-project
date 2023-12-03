import React, {Component, FocusEvent} from 'react';

type DateInputProps = {
  title: string
  startDate: {
    datalaceholder: string
    onChange?: (evt: FocusEvent<HTMLInputElement>) => void,
  }
  endDate?: {
    datalaceholder: string
    onChange?: (evt: FocusEvent<HTMLInputElement>) => void,
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
                 required
                 aria-required="true"
                 onChange={startDate.onChange}
          />
          {endDate ?
              <input type="date"
                     style={inputStyle}
                     data-placeholder={endDate.datalaceholder}
                     required
                     aria-required="true"
                     onChange={endDate.onChange}
              /> : null}
        </label>
    );
  }
}