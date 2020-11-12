import './App.css';
import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import './App.css';
import Login from './Login.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import Todos from './Todo.js';
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {

  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (jim1, jim2) => {
    localStorage.setItem('TOKEN', jim2);
    localStorage.setItem('USERNAME', jim1);

    this.setState({
      username: jim1,
      token: jim2
    })
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })

  }

  
  render() {
    return (
      <div>
        <Router>
          <ul>
            {
            this.state.token 
            ? <div>
              {this.state.username}
              <button onClick={this.logOut}>Log out</button>
            </div>
          : <>
           <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            </>}
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => 
                <Login 
                  {...routerProps} 
                  changeTokenAndUsername={this.changeTokenAndUsername} 
              />
              } 
            />
            <Route 
              exact 
              path='/signup' 
              render={(routerProps) => 
                  <SignUp  
                    {...routerProps} 
                    changeTokenAndUsername={this.changeTokenAndUsername} 
                    />
                } 
              />
            <PrivateRoute 
              token={this.state.token} 
              exact 
              path='/todos' 
              render={(routerProps) => <Todos {...routerProps} token={this.state.token} />} />

          </Switch>
        </Router>
      </div>
    )
  }
}