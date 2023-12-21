import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
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
import Error500 from "./pages/Error/Error500";
import Error404 from "./pages/Error/Error404";
import Swal from 'sweetalert2';

type PrivateRouteProps = {
  component: React.ComponentType<any>;
  path: string
}

export class PrivateRoute extends Component<PrivateRouteProps> {
  redirectLoginPage = () => {
    Swal.fire({
      icon: "warning",
      text: "로그인 이후 접근 가능합니다.",
    });
    return <Redirect to="/"/>;
  }


  render() {
    const {component: Component, path} = this.props;

    return (
        <Route
            render={(props) =>
                localStorage.getItem('accessToken') !== null ? (
                    <Component exact path={path}/>
                ) : (
                    this.redirectLoginPage()
                )
            }
        />
    );
  }
}

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <PrivateRoute path="/main-page" component={MainPage}/>
            <PrivateRoute path="/my-page" component={Mypage}/>
            <PrivateRoute path="/product/list" component={ViewProducts}/>
            <PrivateRoute path="/instruction/list" component={ViewInstructions}/>
            <PrivateRoute path="/instruction/add" component={AddInstructions}/>
            <PrivateRoute path="/customer/list" component={CustomerPage}/>
            <PrivateRoute path="/delivery/list" component={ViewDeliveries}/>
            <PrivateRoute path="/delivery/add" component={AddDeliveries}/>
            <PrivateRoute path="/current/page" component={currentSituationpage}/>
            <PrivateRoute path="/employee/list" component={ViewEmployees}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/error" component={Error500}/>
            <Route exact path="/not-found" component={Error404}/>
            <Route exact path="/*" component={Error404}/>
          </Switch>
        </Router>
    );
  }
}

export default App;