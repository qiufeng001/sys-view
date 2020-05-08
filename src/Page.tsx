import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import notFound from './components/framework/NotFound';
import login from './components/framework/Login';
import appRoute from './routes/Route';
import headerRoute from './components/framework/Header';
import index from './components/framework/index';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/index" push />} />
            <Route path="/404" component={notFound} />
            <Route path="/login" component={login} />
            <Route path="/headerRoute" component={headerRoute} />
            <Route path="/appRoute" component={appRoute} />
            <Route path="/index" component={index} />
            <Route component={notFound} />
        </Switch>
    </Router>
);
