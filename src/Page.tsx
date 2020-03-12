import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import appRoute from './routes/Route';
import homeRoute from './components/pages/Header';
export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" push />} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/homeRoute" component={homeRoute} />
            <Route path="/appRoute" component={appRoute} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);
