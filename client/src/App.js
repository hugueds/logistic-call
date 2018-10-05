import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import MainContainer from './containers/MainContainer';
import ConfigContainer from './containers/ConfigContainer';



class App extends Component {


  constructor(props) {
    super();
    this.state = {
      user: localStorage.getItem('user'),
      groupId: +localStorage.getItem('groupId')
    }

    console.log(this.state)
  }

  
  render() {    
    console.log(this.state.groupId)
    return (      
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={MainContainer} />
          <Route path="/config" component={ConfigContainer} />
          {
            this.state.groupId == null 
            ? <Redirect to="/config" /> 
            : <Redirect to="/home" />
          }
          
        </Switch>
      </BrowserRouter>
    );
  }

}

// class AllRoutes extends Component {
//   render() {
//     return (
      
//     );
//   }
// }

export default App;
