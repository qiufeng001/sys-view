import service from './axios'

export const execute = {
    getData(url, params) {
        return service({
            url: url,
            method: 'get',
            params
        })
    },

    postData(url, params) {
        return service({
            url: url,
            method: 'post',
            params
        })
    }
}
