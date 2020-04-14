import portalBaseUrl from './baseconfig';
const baseUrl = portalBaseUrl.Config.portalUrl;
const Portal = {
    // 交互的默认地址
    isLogin: baseUrl + '/cas/isLogin',
    index: baseUrl + '/index'
};
export default Portal;