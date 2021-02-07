import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Alert from "react-s-alert";
import { signup} from "../util/APIUtils";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: 300,
    },
    button: {
        margin: theme.spacing(1),
        width: 300,
    },
    formControl: {
        padding: theme.spacing(3),

    }
}));

export default function SignUpForm() {


    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        name: '',
        password: '',
    });

    const [passwordFlag, setPasswordFlag] = React.useState({show: false})

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });

    };

    const handleClickShowPassword = () => {

        setPasswordFlag({ show: !passwordFlag.show });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleSubmit = event => {
        event.preventDefault();

        const signupRequest = Object.assign({}, values);

        signup(signupRequest)
            .then(response => {
                Alert.success("Singup successful!")
                setValues({
                    email: '',
                    name: '',
                    password: '',
                });
            }).catch(error => {
            Alert.error((error && error.message) || ' Please try again!');
        });


    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs = {12}>
                <h1 >Sign up</h1>
            </Grid>

            <Grid item xs = {12}>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        value={values.name}
                        onChange={handleChange('name')}
                        labelWidth={40}
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {12}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        value={values.email}
                        onChange={handleChange('email')}
                        labelWidth={40}
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {12}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={passwordFlag.show ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {passwordFlag.show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {12}>
                <Button on variant="contained" className={classes.button} onClick={handleSubmit}>
                    Sign up
                </Button>
            </Grid>

        </Grid>
    );
}
