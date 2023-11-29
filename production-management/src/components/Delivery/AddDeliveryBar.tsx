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
                        flexDirection: 'row',
                        justifyContent:'space-between',
                        alignItems: 'center',
                        borderRadius: '10px'
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
                            <input type="date" placeholder='출고일'
                                   style={{height: '20px', marginLeft: '10px', width: '125px'}}
                                   defaultValue={state.search.startDate}
                                   data-placeholder='시작일'
                                   required
                                   onChange={(e) => {
                                       Delivery.deliveryDate = e.target.value;
                                   }}/>
                        </label>
                    </div>
                    <div style={{marginTop: '7px', marginBottom: '7px'}}>
                        <img src={require('../../images/button/add-button.png')}
                             style={{width: '30px', marginRight: '10px', marginTop: '6px'}}
                             className='cellHoverEffect'
                             onClick={state.delivery.deliveryNo === '' ? this.addDeliveryClick : this.newAddDeliveryClick} />
                    </div>
                </Box>
            </>
        )
    }

}

export default AddDeliveryBar;