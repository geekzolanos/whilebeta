import React from 'react';
import Courses from 'views/Courses';
import Home from 'views/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthCheck } from 'reactfire';

function DashboardRouter() {
  return (
    <Switch>
        <Route path='/courses'>
          <AuthCheck fallback={<Redirect to="/" />} children={<Courses />} />
        </Route>
        
        <Route path='*' component={Home} />
    </Switch>
  )  
}

export default DashboardRouter;