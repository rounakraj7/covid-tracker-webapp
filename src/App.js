import React, {Component} from 'react';
import Login from "./login-signup/Login";
import { getCurrentUser} from "./util/APIUtils";
import { ACCESS_TOKEN } from "./constants";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import {
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from "./common/PrivateRoute";
import NotFound from "./common/NotFound";
import {CircularProgress} from "@material-ui/core";
import Home from "./dashboard/Home";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            authenticated: true,
            loading: false
          });
        }).catch(error => {
      this.setState({
        loading: false
      });
    });
  }

  handleLogin() {
    this.loadCurrentlyLoggedInUser();
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }
  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <CircularProgress />
    }
    return (
        <div className="App">
          <div className="app-body">
            <Switch>
              <Route exact path="/"  render={(props) => <Login authenticated={this.state.authenticated} onLogin={this.handleLogin}  {...props} />}></Route>
              <PrivateRoute path="/home" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                            handleLogout={this.handleLogout} component={Home}></PrivateRoute>
              <Route path="/login"
                     render={(props) => <Login authenticated={this.state.authenticated} onLogin={this.handleLogin} {...props} />}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
          <Alert stack={{limit: 3}}
                 timeout = {3000}
                 position='top-right' effect='slide' offset={65} />
        </div>
    );
  }
}

export default App;
