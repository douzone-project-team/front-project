import {Component} from "react";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {AddButton} from "../../core/button/AddButton";
import {DateInput} from "../../core/input/DateInput";

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
            <BarLeftBox width='70vw'>
              <DateInput title='출고일'
                         startDate={{
                           datalaceholder: '출고일',
                           onChange: (e) => {
                             Delivery.deliveryDate = e.target.value
                           },
                           required: true
                         }}/>
            </BarLeftBox>
            <BarRightBox>
              <AddButton
                  size={30}
                  onClick={state.delivery.deliveryNo === '' ? this.addDeliveryClick : this.newAddDeliveryClick}/>
            </BarRightBox>
          </BarBox>
        </>
    )
  }

}

export default AddDeliveryBar;