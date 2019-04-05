import React, { Component } from 'react';
import './lib';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NavBar } from './components';
import { PdfUpload, PdfForm, PdfConfig } from './pages';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <Switch>
            <Redirect exact from='/' to='/files' />
            <Route path='/files' render={() => (<PdfUpload />)} />
            <Route path='/configure' render={() => (<PdfConfig />)} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
