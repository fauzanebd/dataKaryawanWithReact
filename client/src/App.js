import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeesList from './EmployeesList';
import EmployeeEdit from './EmployeeEdit';
import Api from './Api';
import About from './About'
import NavBar from './NavBar';

const api = new Api();

class App extends Component {

  render() {
    const navbar = <NavBar/>;

    return (
        <Router>
          <Switch>
            <Route
                path='/'
                exact={true}
                render={(props) => <Home {...props} api={api} navbar={navbar}/>}
            />
            <Route
                path='/employees'
                exact={true}
                render={(props) => <EmployeesList {...props} api={api} navbar={navbar}/>}
            />
            <Route
                path='/employees/:id'
                render={(props) => <EmployeeEdit {...props} api={api} navbar={navbar}/>}
            />
            <Route
                path='/about'
                render={ ( props ) => <About {...props} api={api} navbar={navbar}/> }
            />
          </Switch>
        </Router>
    )
  }
}

export default App;