// const server = "http://115.28.106.80/";
const server = "http://localhost/";
const Config = {
    baseUrl: {
        server:  server,
        // 交互的默认地址http://115.28.106.80/portal
        portalUrl: server + "portal",
        casUrl: "cas",
        reactUrl: server
    },
    bathCompPath: {
        baseModul: "../../components/pages",
    }
};

module.exports.Config = Config;