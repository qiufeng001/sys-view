import baseConfig from './baseConfig';
const portalUrl = baseConfig.Config.baseUrl.portalUrl;
const BaseUrl = {
    serverUrl: {
        server: baseConfig.Config.baseUrl.server
    },
    portal: {
        // 交互的默认地址
        isLogin: portalUrl + '/cas/isLogin',
        redirectToReact: portalUrl + '/cas/redirectToReact',
        loginUser: portalUrl + '/cas/loginUser', 
        index: portalUrl + '/index'
    }
};
export default BaseUrl;