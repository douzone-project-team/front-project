import React, {Component} from 'react';
import CustomerInputBar from '../../components/Customer/CustomerInputBar';
import CustomerViewTable from '../../components/Customer/CustomerViewTable';

class CustomerPage extends Component {
    render () {
        return (
            <>
                <CustomerInputBar/>
                {/*<CustomerViewTable/>*/}
            </>
        )
    }
}

export default CustomerPage;
