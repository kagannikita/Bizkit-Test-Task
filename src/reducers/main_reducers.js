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

const initialState = {
  isAuthenticated: false,
  isLoginError: false,
  isLoginPending: false,
  clients: [],
  isClientsPending: false,
  isDeletePending: false,
  isAddPending: false,
  isClientPending: false,
  isUpdateClientPending: false,
  bankDataPending: false,
  isCheckTokenError: false,
  client: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_PENDING:
      return {
        ...state,
        isLoginError: false,
        isLoginPending: true
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoginPending: false
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        isLoginError: true,
        isLoginPending: false
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoginPending: false
      };
    case CHECK_TOKEN_PENDING:
      return {
        ...state,
        isCheckTokenError: false
      };
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case CHECK_TOKEN_FAILED:
      return {
        ...state,
        isCheckTokenError: true
      };
    case GET_CLIENTS_PENDING:
      return {
        ...state,
        client: {},
        isClientsPending: true
      };
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        isClientsPending: false,
        clients: payload
      };
    case GET_CLIENTS_FAILED:
      return {
        ...state,
        isClientsPending: false
      };
    case DELETE_CLIENT_PENDING:
      return {
        ...state,
        isDeletePending: true
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        isDeletePending: false
      };
    case DELETE_CLIENT_FAILED:
      return {
        ...state,
        isDeletePending: false
      };
    case ADD_CLIENT_PENDING:
      return {
        ...state,
        isAddPending: true
      };
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        isAddPending: false
      };
    case ADD_CLIENT_FAILED:
      return {
        ...state,
        isAddPending: false
      };
    case GET_CLIENT_PENDING:
      return {
        ...state,
        client: {},
        isClientPending: true
      };
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        isClientPending: false,
        client: payload
      };
    case GET_CLIENT_FAILED:
      return {
        ...state,
        isClientPending: false
      };
    case UPDATE_CLIENT_PENDING:
      return {
        ...state,

        isUpdateClientPending: true
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        isUpdateClientPending: false
      };
    case UPDATE_CLIENT_FAILED:
      return {
        ...state,
        isUpdateClientPending: false
      };
    case ADD_BANK_DATA_PENDING:
      return {
        ...state,
        bankDataPending: true
      };
    case ADD_BANK_DATA_SUCCESS:
      return {
        ...state,
        bankDataPending: false
      };
    case ADD_BANK_DATA_FAILED:
      return {
        ...state,
        bankDataPending: false
      };
    case UPDATE_BANK_DATA_PENDING:
      return {
        ...state,
        bankDataPending: true
      };
    case UPDATE_BANK_DATA_SUCCESS:
      return {
        ...state,
        bankDataPending: false
      };
    case UPDATE_BANK_DATA_FAILED:
      return {
        ...state,
        bankDataPending: false
      };
    case DELETE_BANK_DATA_PENDING:
      return {
        ...state,
        bankDataPending: true
      };
    case DELETE_BANK_DATA_SUCCESS:
      return {
        ...state,
        bankDataPending: false
      };
    case DELETE_BANK_DATA_FAILED:
      return {
        ...state,
        bankDataPending: false
      };
    default: {
      return state;
    }
  }
}
