import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import BlogList from './BlogList';
import Header from './Header';
import AboutMe from './AboutMe';

class App extends Component<{}, {}> {
  render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/index.html'>
            <Redirect to='/'/>
          </Route>
          <Route exact path='/blog'>
            <BlogList/>
          </Route>
          <Route exact path='/blog/:year/:path'>
            <Blog/>
          </Route>
          <Route exact path='/about'>
            <AboutMe/>
          </Route>
          <Route exact path='/404'>
            <Header/>
            <h1 style={{ color: '#fff', textAlign: 'center', fontWeight: 100, fontSize: '4rem' }}>
              404<br/>Page not found</h1>
          </Route>
          <Route path='*'>
            <Redirect to='/404'/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
