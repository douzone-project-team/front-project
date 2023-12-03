import {Component} from "react";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {BarBox} from "../../core/BarBox";
import {AddButton} from "../../core/button/AddButton";

let Delivery = {
  deliveryDate: '',
  deliveryStatus: '',
};

interface AddDeliveryBarState {
  showModal: boolean;
  message: string;
}

class AddDeliveryBar extends Component {
  static contextType = DeliveriesContext;

  addDeliveryClick = () => {
    const parsedDeliveryData = Delivery.deliveryDate
        ? new Date(Delivery.deliveryDate)
        : new Date();

    Delivery.deliveryStatus = Delivery.deliveryStatus === '' ? 'STANDBY' : Delivery.deliveryStatus;
    Delivery.deliveryDate = parsedDeliveryData.toLocaleDateString('en-CA');

    const state = this.context as DeliveriesState;
    state.addDelivery(Delivery);
  }

  newAddDeliveryClick = () => {
    const state = this.context as DeliveriesState;
    state.cleanDelivery();

    this.addDeliveryClick();
  }

  render() {
    const state = this.context as DeliveriesState;
    return (
        <>
          <BarBox>
            <div style={{width: '70vw', marginBottom: '7px', marginTop: '7px'}}>
              <label>
                        <span style={{
                          marginLeft: '50px',
                          marginRight: '5px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}>출고일</span>
                <input type="date"
                       style={{height: '20px', marginLeft: '10px', width: '125px'}}
                       defaultValue={state.search.startDate}
                       data-placeholder='출고일'
                       required
                       onChange={(e) => {
                         Delivery.deliveryDate = e.target.value;
                       }}/>
              </label>
            </div>
            <div style={{marginTop: '7px', marginBottom: '7px'}}>
              <AddButton
                  onClick={state.delivery.deliveryNo === '' ? this.addDeliveryClick : this.newAddDeliveryClick}/>
            </div>
          </BarBox>
        </>
    )
  }

}

export default AddDeliveryBar;