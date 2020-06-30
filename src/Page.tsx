import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import notFound from './components/framework/NotFound';
import login from './components/framework/Login';
import appRoute from './routes/Route';
import index from './components/framework/Index';

export default () => (
    <BrowserRouter>
        <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/index" push />} /> */}`
            <Route exact path="/" component={index} />
            {/* <Route exact path="/" component={login} /> */}
            <Route path="/404" component={notFound} />
            <Route path="/login" component={login} />
            <Route path="/appRoute" component={appRoute} />
            <Route component={notFound} />
        </Switch>
    </BrowserRouter>
);
