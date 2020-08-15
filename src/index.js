import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    ));

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#007BFF' },
      secondary: { main: '#666666' },
      error: { main: '#BB1C1C' }
    }
  },
  ruRU
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


