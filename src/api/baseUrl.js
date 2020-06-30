import baseConfig from './baseConfig';
const portalUrl = baseConfig.Config.baseUrl.portalUrl;
const server = baseConfig.Config.baseUrl.server;
const BaseUrl = {
    serverUrl: {
        server: server
    },
    cas: {
        // login: server + 'cas/login',
        login: 'http://115.28.106.80/cas/login'
    },
    portal: {
        // 交互的默认地址
        portal: portalUrl,
        logout: portalUrl + '/cas/logout',
        redirectToReact: portalUrl + '/cas/redirectToReact',
        loginUser: portalUrl + '/cas/loginUser', 
        index: portalUrl + '/index'
    }
};
export default BaseUrl;