import React from 'react';
import Dashboard from 'layouts/Dashboard';
import Login from 'views/Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function AppRouter() {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Dashboard} />

          <Route path="*">
              <Redirect to="/" />
          </Route>
        </Switch>
    </Router>
  )  
}

export default AppRouter;