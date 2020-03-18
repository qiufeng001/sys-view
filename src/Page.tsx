import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import notFound from './components/pages/NotFound';
import login from './components/pages/Login';
import appRoute from './routes/Route';
import homeRoute from './components/pages/Header';
import index from './components/pages/index';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/index" push />} />
            <Route path="/404" component={notFound} />
            <Route path="/login" component={login} />
            <Route path="/homeRoute" component={homeRoute} />
            <Route path="/appRoute" component={appRoute} />
            <Route path="/index" component={index} />
            <Route component={notFound} />
        </Switch>
    </Router>
);
