import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { checkToken } from '../actions/actions';

const Preloader = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(237, 240, 244, 0.9);
`;

let token = () => {
  let tok = localStorage.getItem('token');
  return !!tok;
};

const MyRouter = ({
  component: Component,
  isAuthenticated,
  isCheckTokenError,
  twoStepAuth,
  checkToken,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated) {
        return <Component {...props} />;
      } else if (!isAuthenticated && token() && !isCheckTokenError) {
        let data = {
          token: localStorage.getItem('token')
        };
        checkToken(data);
        return (
          <Preloader>
            <CircularProgress />
          </Preloader>
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: '/sign_in',
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);
const mapStateToProps = function(state) {
  return {
    isAuthenticated: state.main.isAuthenticated,
    isCheckTokenError: state.main.isCheckTokenError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkToken: data => dispatch(checkToken(data))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyRouter)
);
