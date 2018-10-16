import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';



import MainContainer from './containers/MainContainer';
import ConfigContainer from './containers/ConfigContainer';
import GroupContainer from './containers/GroupContainer';

import './css/App.css';
import Navbar from './components/Navbar';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem('user'),
      groupId: +localStorage.getItem('groupId')
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <Navbar />
          <div className="content-container">
            <Switch>
              <Route path="/home" component={MainContainer} />
              <Route path="/config" component={ConfigContainer} />
              <Route path="/groups" component={GroupContainer} />
              {
                this.state.groupId == null
                  ? <Redirect to="/config" />
                  : <Redirect to="/home" />
              }

            </Switch>
          </div>
        </div>
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
