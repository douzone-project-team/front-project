import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ViewProducts from "./pages/Product/ViewProducts";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/product/list" component={ViewProducts}/>
          </Switch>
        </Router>
    );
  }
}

export default App;