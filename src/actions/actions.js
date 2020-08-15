import {
  CHECK_TOKEN_SUCCESS,
    CHECK_TOKEN_PENDING,
    CHECK_TOKEN_FAILED,

 SIGN_IN_SUCCESS,
    SIGN_IN_PENDING,
    SIGN_IN_FAILED,

  LOG_OUT_SUCCESS,

  GET_CLIENT_SUCCESS,
    GET_CLIENT_PENDING,
    GET_CLIENT_FAILED,

  GET_CLIENTS_SUCCESS,
    GET_CLIENTS_PENDING,
    GET_CLIENTS_FAILED,

  UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_PENDING,
    UPDATE_CLIENT_FAILED,

  DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_PENDING,
    DELETE_CLIENT_FAILED,

  ADD_CLIENT_SUCCESS,
    ADD_CLIENT_FAILED,
    ADD_CLIENT_PENDING,

  ADD_BANK_DATA_SUCCESS,
    ADD_BANK_DATA_PENDING,
    ADD_BANK_DATA_FAILED,

  UPDATE_BANK_DATA_SUCCESS,
    UPDATE_BANK_DATA_PENDING,
    UPDATE_BANK_DATA_FAILED,

  DELETE_BANK_DATA_SUCCESS,
    DELETE_BANK_DATA_PENDING,
    DELETE_BANK_DATA_FAILED
} from '../types';
import API from '../api';

const api = new API();

export const logIn = data => dispatch => {
  dispatch({ type: SIGN_IN_PENDING });
  api
    .logIn(data)
    .then(res => {
      dispatch({
        type: SIGN_IN_SUCCESS
      });
      localStorage.setItem('token', res.data.access);
    })
    .catch(err => {
      dispatch({
        type: SIGN_IN_FAILED
      });
    });
};

export const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT_SUCCESS });
  localStorage.removeItem('token');
};

export const checkToken = token => dispatch => {
  dispatch({ type: CHECK_TOKEN_PENDING });
  api
    .checkToken(token)
    .then(res => {
      dispatch({
        type: CHECK_TOKEN_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
        type: CHECK_TOKEN_FAILED
      });
      localStorage.removeItem('token');
    });
};

export const getClients = () => dispatch => {
  dispatch({ type: GET_CLIENTS_PENDING });
  api
    .getCompaniesList()
    .then(res => {
      dispatch({
        type: GET_CLIENTS_SUCCESS,
        payload: res.data.results
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CLIENTS_FAILED
      });
    });
};

export const deleteClient = id => dispatch => {
  dispatch({ type: DELETE_CLIENT_PENDING });
  api
    .deleteCompany(id)
    .then(res => {
      dispatch({
        type: DELETE_CLIENT_SUCCESS
      });
      dispatch(getClients());
    })
    .catch(err => {
      dispatch({
        type: DELETE_CLIENT_FAILED
      });
    });
};

export const addClient = data => dispatch => {
  dispatch({ type: ADD_CLIENT_PENDING });
  api
    .addCompany(data)
    .then(res => {
      dispatch({
        type: ADD_CLIENT_SUCCESS
      });
      dispatch(getClients());
    })
    .catch(err => {
      dispatch({
        type: ADD_CLIENT_FAILED
      });
    });
};

export const getClientById = id => dispatch => {
  dispatch({ type: GET_CLIENT_PENDING });
  api
    .getCompany(id)
    .then(res => {
      dispatch({
        type: GET_CLIENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CLIENT_FAILED
      });
    });
};

export const updateClient = (id, data) => dispatch => {
  dispatch({ type: UPDATE_CLIENT_PENDING });
  api
    .updateCompany(id, data)
    .then(res => {
      dispatch({
        type: UPDATE_CLIENT_SUCCESS
      });
      dispatch(getClientById(id));
    })
    .catch(err => {
      dispatch({
        type: UPDATE_CLIENT_FAILED
      });
    });
};

export const addBankData = (id, data) => dispatch => {
  dispatch({ type: ADD_BANK_DATA_PENDING });
  api
    .addBankData(id, data)
    .then(res => {
      dispatch({
        type: ADD_BANK_DATA_SUCCESS
      });
      dispatch(getClientById(id));
    })
    .catch(err => {
      dispatch({
        type: ADD_BANK_DATA_FAILED
      });
    });
};

export const updateBankData = (companyId, id, data) => dispatch => {
  dispatch({ type: UPDATE_BANK_DATA_PENDING });
  api
    .updateBankData(companyId, id, data)
    .then(res => {
      dispatch({
        type: UPDATE_BANK_DATA_SUCCESS
      });
      dispatch(getClientById(companyId));
    })
    .catch(err => {
      dispatch({
        type: UPDATE_BANK_DATA_FAILED
      });
    });
};

export const deleteBankData = (companyId, id) => dispatch => {
  dispatch({ type: DELETE_BANK_DATA_PENDING });
  api
    .deleteBankData(companyId, id)
    .then(res => {
      dispatch({
        type: DELETE_BANK_DATA_SUCCESS
      });
      dispatch(getClientById(companyId));
    })
    .catch(err => {
      dispatch({
        type: DELETE_BANK_DATA_FAILED
      });
    });
};
