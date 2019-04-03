import React, { Component } from 'react';
import './lib';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NavBar } from './components';
import { PDFConfig, PDFForm } from './pages';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <Switch>
            <Redirect exact from='/' to='/pdfconfig' />
            <Route path='/pdfconfig' render={() => (<PDFConfig />)} />
            <Route path='/pdfform' render={() => (<PDFForm />)} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
