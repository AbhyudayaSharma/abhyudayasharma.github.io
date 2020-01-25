import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import BlogList from './BlogList';

class App extends Component<{}, {}> {
  render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/blog">
            <BlogList/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
