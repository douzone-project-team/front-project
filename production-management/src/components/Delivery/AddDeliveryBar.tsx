import {Component} from "react";
import {DeliveriesContext} from "../../store/Delivery/deliveries-context";
import {DeliveriesState} from "../../object/Delivery/delivery-object";
import {BarBox, BarLeftBox, BarRightBox} from "../../core/box/BarBox";
import {AddButton} from "../../core/button/AddButton";
import {DateInput} from "../../core/input/DateInput";
import Swal from "sweetalert2";

let Delivery = {
    deliveryDate: '',
    deliveryStatus: '',
};

interface AddDeliveryBarState {
    showModal: boolean;
    message: string;
}

interface AddDeliveryBarProps {
    clearTable: () => void;
    clearSelectedInstructionNo: () => void;
}

class AddDeliveryBar extends Component<AddDeliveryBarProps, AddDeliveryBarState> {
    static contextType = DeliveriesContext;

    addDeliveryClick = () => {
        const parsedDeliveryData = Delivery.deliveryDate
            ? new Date(Delivery.deliveryDate)
            : new Date();

        Delivery.deliveryStatus = Delivery.deliveryStatus === '' ? 'STANDBY' : Delivery.deliveryStatus;
        Delivery.deliveryDate = parsedDeliveryData.toLocaleDateString('en-CA');

        const state = this.context as DeliveriesState;
        state.addDelivery(Delivery);
        this.props.clearTable();
        this.props.clearSelectedInstructionNo();
    }

    newAddDeliveryClick = () => {
        const state = this.context as DeliveriesState;

        Swal.fire({
            title: "새로운 출고를 등록하겠습니까?",
            text: "새로운 출고 등록시 이전 작업은 종료됩니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "완료",
            cancelButtonText: "취소",
            reverseButtons: true,
            focusCancel: true
        }).then((result) => {
            if(result.dismiss === Swal.DismissReason.cancel) {
                return;
            }
            state.cleanDelivery();
            this.addDeliveryClick();
        });
    }

render()
{
    const state = this.context as DeliveriesState;
    return (
        <>
            <BarBox>
                <BarLeftBox width='70vw'>
                    <DateInput title='출고일'
                               darkMode
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