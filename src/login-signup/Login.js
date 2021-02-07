import React, {Component} from 'react';
import { withStyles , Button} from "@material-ui/core/";
import Alert from "react-s-alert";
import {Redirect} from 'react-router-dom';
import LoginForm from "./LoginForm";
import Grid from "@material-ui/core/Grid";
import SignUpForm from "./SignUpForm";

class Login extends Component{

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render(){
        if(this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/home",
                    state: { from: this.props.location }
                }}/>;
        }

        return (
            <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={6}>
                    <LoginForm onLogin ={this.props.onLogin}/>
                </Grid>
                <Grid item xs={6}>
                    <SignUpForm/>
                </Grid>
            </Grid>
        );
    }
}

export default Login;
