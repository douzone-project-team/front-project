import React, {Component, FocusEvent} from 'react';

type InputProps = {
  title: string,
  onBlur?: (evt: FocusEvent<HTMLInputElement>) => void,
  onChange?: (evt: FocusEvent<HTMLInputElement>) => void,
  value?: string,
  placeholder? : string,
  readOnly? : boolean
  input?: {
    width?: string,
    height?: string,
    ml?: string
  },
  label?: {
    ml?: string,
    mr?: string,
    fs?: string,
    fw?: string
  }
};

export class TextInput extends Component<InputProps> {
  render() {
    const {label, onBlur, input, title, onChange, value, readOnly,placeholder} = this.props;

    return (
        <label>
        <span
            style={{
              marginLeft: label?.ml ? label.ml : '50px',
              marginRight: label?.mr ? label.mr : '5px',
              fontSize: label?.fs ? label.fs : '17px',
              fontWeight: label?.fw ? label.fw : 'bold',
              lineHeight: '18px',
            }}
        >
          {title}
        </span>
          <input
              type="text"
              style={{
                marginLeft: input?.ml ? input.ml : '10px',
                height: input?.height ? input.height : '30px',
                width: input?.width ? input.width : '200px',
                fontSize: '15px',
                lineHeight: '18px',
              }}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              readOnly={readOnly}
          />
        </label>
    );
  }
}
