import React, { Component } from 'react';
import './lib';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NavBar } from './components';
import { PdfUpload, PDFForm } from './pages';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <Switch>
            <Redirect exact from='/' to='/pdfconfig' />
            <Route path='/upload' render={() => (<PdfUpload />)} />
            <Route path='/configure' render={() => (<PDFForm />)} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
