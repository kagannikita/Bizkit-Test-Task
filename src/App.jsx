import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRouter from './routes/MyRouter';
import Auth from './SignIn';
import Main from './Client_Page';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/sign_in">
            <Auth />
          </Route>
          <PrivateRouter path="/" component={Main} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
