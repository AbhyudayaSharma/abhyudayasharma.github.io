import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import BlogList from './BlogList';
import Header from './Header';

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
          <Route path='*'>
            <Header/>
            <h1 style={{ color: '#fff', textAlign: 'center' }}>404<br/>Page not found</h1>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
