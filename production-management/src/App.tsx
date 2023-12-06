import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ViewProducts from "./pages/Product/ViewProducts";
import ViewInstructions from "./pages/Instruction/ViewInstructions";
import AddInstructions from "./pages/Instruction/AddInstructions";
import CustomerPage from './pages/Customer/CustomerPage';
import MainPage from './pages/Main/MainPage';
import Login from './pages/Auth/Login';
import ViewDeliveries from './pages/Delivery/ViewDeliveries';
import currentSituationpage from "./pages/CurrentSituation/CurrentSituationpage";
import AddDeliveries from './pages/Delivery/AddDeliveries';
import Mypage from "./pages/Employee/Mypage";
import ViewEmployees from "./pages/Auth/ViewEmployees";
import AddEmployees from "./pages/Auth/AddEmployees";
import Error500 from "./pages/Error/Error500";
import Error404 from "./pages/Error/Error404";


class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/myPage" component={Mypage}/>
            <Route exact path="/product/list" component={ViewProducts}/>
            <Route exact path="/instruction/list" component={ViewInstructions}/>
            <Route exact path="/instruction/add" component={AddInstructions}/>
            <Route exact path="/customer/list" component={CustomerPage}/>
            <Route exact path="/delivery/list" component={ViewDeliveries}/>
            <Route exact path="/delivery/add" component={AddDeliveries}/>
              <Route exact path="/current/page" component={currentSituationpage}/>
            <Route exact path="/employee/list" component={ViewEmployees}/>
            <Route exact path="/employee/add" component={AddEmployees}/>
            <Route exact path="/error" component={Error500}/>
            <Route exact path="/not-found" component={Error404}/>
          </Switch>
        </Router>
    );
  }
}

export default App;