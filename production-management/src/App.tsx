import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ViewProducts from "./pages/Product/ViewProducts";
import ViewInstructions from "./pages/Instruction/ViewInstructions";
import AddInstructions from "./pages/Instruction/AddInstructions";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/product/list" component={ViewProducts}/>
            <Route exact path="/instruction/list" component={ViewInstructions}/>
            <Route exact path="/instruction/add" component={AddInstructions}/>
          </Switch>
        </Router>
    );
  }
}

export default App;