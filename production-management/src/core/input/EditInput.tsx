import React, {Component, FocusEvent} from 'react';
import './../../assets/css/Styles.css';

type EditInputProps = {
  type: string,
  defaultValue: string,
  onChange?: (evt: FocusEvent<HTMLInputElement>) => void,
  onBlur?: (evt: FocusEvent<HTMLInputElement>) => void,
}

export class EditInput extends Component<EditInputProps> {

  render() {
    const {type, defaultValue, onChange, onBlur} = this.props;

    return (
        <input type={type}
               style={{
                 width: '100%',
                 height: '100%',
                 textAlign: 'center',
                 border: 0,
                 fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                 fontWeight: 400,
                 fontSize: '0.875rem',
                 marginLeft: '9px'
               }}
               defaultValue={defaultValue}
               onChange={onChange}
               onBlur={onBlur}
        />
    );
  }
}