import {Component} from "react";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {Box} from "@material-ui/core";

let Delivery = {
    deliveryDate: '',
    deliveryStatus: '',
};

interface AddDeliveryBarState {
    showModal: boolean;
    message: string;
}

class AddDeliveryBar extends Component{
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
                <Box
                    sx={{
                        width: '100%',
                        height: '40px',
                        border: '1.4px solid #D3D3D3',
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent:'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{width: '70vw', marginBottom: '7px', marginTop: '7px'}}>
                        <label>
                        <span style={{
                            marginLeft: '50px',
                            marginRight: '5px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}>등록일</span>
                            <input type="date"
                                   style={{height: '20px'}}
                                   defaultValue={state.search.startDate}
                                   onChange={(e) => {
                                       Delivery.deliveryDate = e.target.value;
                                   }}/>
                        </label>
                    </div>
                    <div style={{marginTop: '7px', marginBottom: '7px'}}>
                        <button
                            type="submit"
                            style={{
                                height: '25px',
                                marginRight: '10px'
                            }}
                            onClick={state.delivery.deliveryNo === '' ? this.addDeliveryClick : this.newAddDeliveryClick}
                        >
                            출고 추가
                        </button>
                    </div>
                </Box>
            </>
        )
    }

}

export default AddDeliveryBar;