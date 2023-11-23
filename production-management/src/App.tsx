import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ViewProducts from "./pages/Product/ViewProducts";
import ViewInstructions from "./pages/Instruction/ViewInstructions";
import AddInstructions from "./pages/Instruction/AddInstructions";
import CustomerPage from './pages/Customer/CustomerPage';
import MainPage from './pages/Main/MainPage';
import Login from './pages/Auth/Login';
import ViewDeliveries from './pages/Delivery/ViewDeliveries';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/product/list" component={ViewProducts}/>
            <Route exact path="/instruction/list" component={ViewInstructions}/>
            <Route exact path="/instruction/add" component={AddInstructions}/>
            <Route exact path="/customer/list" component={CustomerPage}/>
            <Route exact path="/delivery/list" component={ViewDeliveries}/>
          </Switch>
        </Router>
    );
  }
}

export default App;