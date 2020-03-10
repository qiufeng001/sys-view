import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import appRoute from './routes/Route';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/index" push />} />
            <Route path="/app" component={appRoute} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);
