import React, {Component, FocusEvent} from 'react';
import './../../assets/css/Styles.css';

type EditInputProps = {
  type: string,
  defaultValue: string,
  onChange?: (evt: FocusEvent<HTMLInputElement>) => void,
  onBlur?: (evt: FocusEvent<HTMLInputElement>) => void,
  min?:string,
  max?:string,
  darkMode?:boolean,
}

export class EditInput extends Component<EditInputProps> {

  render() {
    const {type, defaultValue, onChange, onBlur, min, max, darkMode} = this.props;

    return (
        <input type={type}
               style={{
                 width: '100%',
                 height: '100%',
                 textAlign: 'center',
                 border: 0,
                 fontFamily: 'S-CoreDream-3Light',
                 fontWeight: 400,
                 fontSize: '0.875rem',
                 padding: 0,
                 background: 'url(' + require(darkMode ? `../../images/button/date-button-black.png` : `../../images/button/date-button.png`) + ')' + ' no-repeat right 5px center / 16px auto'
               }}
               defaultValue={defaultValue}
               onChange={onChange}
               onBlur={onBlur}
               min={min}
               max={max}
               placeholder={defaultValue}
        />
    );
  }
}