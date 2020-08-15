import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { logIn} from './actions/actions';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f0f0',
    minHeight: '100vh'
  },
  preloader: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(237, 240, 244, 0.9)'
  },
  paper: {
    padding: '40px 34px 55px 34px',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '396px',
    boxSizing: 'border-box',
    alignItems: 'baseline',
    borderRadius: '0'
  },
  header: {
    marginBottom: '48px'
  },
  input: {
    marginBottom: '28px',
    width: '100%'
  },
  button: {
    marginLeft: 'auto',
    background: '#007BFF',
    '&:hover, &:focus': {
      backgroundColor: ' rgb(17, 82, 147)'
    },
    color: '#fff'
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.isLoginError) {
      setOpen(true);
    }
  }, [props.isLoginError]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const classes = useStyles();

  const regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const isValid =
    !regEmail.test(String(email).toLowerCase()) || password.length < 6;

  const logIn= () => {
    let data = {
      email,
      password
    };
    props.LogIn(data);
  };
  return (
    <div className={classes.wrapper}>
      {props.isAuthenticated && <Redirect to="/clients" />}
      {props.isLoginPending && (
        <div className={classes.preloader}>
          <CircularProgress />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Неправильно указан email или пароль
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Typography className={classes.header} variant="h5">
          Авторизация
        </Typography>
        <TextField
          id="outlined-password-input"
          className={classes.input}
          label="Email"
          type="text"
          autoComplete="current-password"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button
          variant="contained"
          className={classes.button}
          disabled={isValid}
          onClick={logIn}
        >
          Войти
        </Button>
      </Paper>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    isAuthenticated: state.main.isAuthenticated,
    isLoginError: state.main.isLoginError,
    isLoginPending: state.main.isLoginPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LogIn: data => dispatch(logIn(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
