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
    },
    page: {
        pageIndex: 1,
        pageSize: 10,
        prePage: "前一页",
        nextPage: "后一页",
        firstPage: "首页",
        lastPage: "末页",
        paginationSize: 3,
        paginationShowsTotal: true,
        noDataText: "没有数据！"
    }
};

module.exports.Config = Config;