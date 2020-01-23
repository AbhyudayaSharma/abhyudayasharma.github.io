import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';

class App extends Component {
  render() : JSX.Element {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/blog">
            <Footer/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
