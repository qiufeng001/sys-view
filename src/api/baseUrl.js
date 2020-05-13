import baseConfig from './baseConfig';
const portalUrl = baseConfig.Config.baseUrl.portalUrl;
const BaseUrl = {
    portal: {
        // 交互的默认地址
        isLogin: portalUrl + '/cas/isLogin',
        redirectToReact: portalUrl + '/cas/redirectToReact',
        loginUser: portalUrl + '/cas/loginUser', 
        index: portalUrl + '/index'
    }
};
export default BaseUrl;