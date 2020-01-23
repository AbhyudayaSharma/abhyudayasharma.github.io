import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/blog">
            <h1>
              Hello world!
            </h1>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
