import baseConfig from './baseConfig';
const portalUrl = baseConfig.Config.baseUrl.portalUrl;
const server = baseConfig.Config.baseUrl.server;
const BaseUrl = {
    serverUrl: {
        server: server
    },
    cas: {
        login: server + 'cas/login',
    },
    portal: {
        // 交互的默认地址
        portal: portalUrl,
        isLogin: portalUrl + '/cas/isLogin',
        redirectToReact: portalUrl + '/cas/redirectToReact',
        loginUser: portalUrl + '/cas/loginUser', 
        index: portalUrl + '/index'
    }
};
export default BaseUrl;