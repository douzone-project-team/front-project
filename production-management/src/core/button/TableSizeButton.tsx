import {Component} from "react";

type TableSizeButtonProps = {
  tableSize: boolean
  tableSizeUp: () => void,
}

export class TableSizeButton extends Component<TableSizeButtonProps> {
  render() {
    const {tableSize, tableSizeUp} = this.props;
    return (
        <div style={{textAlign: 'center'}}>
          <img
              src={require(tableSize ? './../../images/button/table-size-bar-up.png' : './../../images/button/table-size-bar-down.png')}
              onClick={tableSizeUp}
              style={{cursor: 'pointer'}}
              alt={tableSize ? 'Up Arrow' : 'Down Arrow'
              }
          />
        </div>
    );
  }
}