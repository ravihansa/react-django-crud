import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Company from './components/company.component';
import Employee from './components/employee.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Company Employees</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/home'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/company'} className="nav-link">Company</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br></br>
          <Switch>
            <Route exact path='/company' component={Company} />
            <Route exact path='/employee/:companyId' component={Employee} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;