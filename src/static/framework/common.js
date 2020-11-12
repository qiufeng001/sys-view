import axios from 'axios';
import qs from 'qs';
import jQuery from 'jquery';


/** 公告方法处理类 */

/** 操作结果显示 */
export function showOprationState(state, msg) {
    if (state == "success") {
        jQuery("#stateDiv")[0].style.display = "inline";
        jQuery(jQuery("#stateDiv")[0]).text(msg)
        setTimeout(() => {
            jQuery("#stateDiv")[0].style.display = "none";
        }, 2000);
    } else {
        jQuery("#stateDiv")[0].style.display = "inline";
        jQuery(jQuery("#stateDiv")[0]).text(msg)
        setTimeout(() => {
            jQuery("#stateDiv")[0].style.display = "none";
        }, 2000);
    }
}

/** 验证操作方法是否执行 */
export function validateHasParams(type, $) {
    var params = $.state.selectedRowKeys;
    if(type === 'add') {
        return true;
    }
    if(params == null || params == undefined) {
        alert("请选择操作对象！");
        return false;
    }
    if (params.length == 0 && type !== 'add') {
        alert("请选择操作对象！")
        return false;
    }
    if (type == 'edit' || type == 'info') {
        if (params.length > 1) {
            alert("只能选中一条！")
            return false;
        }
    }
    return true;
}

/** 获取执行方法 */
export function executeOperate(type, $, url) {
    switch (type) {
        case 'add':
            addOrEdit(type, $);
            break;
        case 'delete':
            remove($, url);
            break;
        case 'edit':
            addOrEdit(type, $);
            break;
        case 'info':
            info(type, $);
            break;
        case 'export':
            exp($, url);
            break;
    }

}

/** 选项 单选 */
export function rowSelect(row, isSelected, $) {
    const selectRows = $.state.selectedRowKeys;
    if (isSelected) {
        selectRows.push(row.id);
    } else {
        for (var i = 0; i < selectRows.length; i++) {
            var exitRow = selectRows[i];
            if (exitRow == row.id) {
                selectRows.splice(i, 1);
                break;
            }
        }
    }
}

/** 选项 全选 */
export function rowSelectAll(rows, isSelected, $) {
    const selectRows = $.state.selectedRowKeys;
    if (isSelected) {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (selectRows.indexOf(row) == -1) {
                selectRows.push(row.id);
            }
        }
    } else {
        selectRows.splice(0);
    }
}

export function searchDatas(queryParams, url, $) {
    const seachUrl = url + "list";
    // axios.post(seachUrl, qs.stringify(queryParams)).then(res => {
    //     const datas = res.data.rows;
    //     const total = res.data.total;
    //     $.setState({ datas: datas, total: total })
    // }).catch(err => {
    //     // data = [{msg : "error"}]
    // });

    axios({
        method: "post",
        url: seachUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: qs.stringify(queryParams)
    }).then((res) => {
        const datas = res.data.rows;
        const total = res.data.total;
        $.setState({ datas: datas, total: total })
    }).catch(err => {
        this.props.resFun("failed");
    });

}

export function infoDetail(url, $) {
    const infoUrl = url + $.state.params[0];
    axios.get(infoUrl).then(res => {
        const data = res.data.rows;
        $.setState({ data: data })
    }).catch(err => {
        // data = [{msg : "error"}]
    });
}

export function changeSeachParams(feild, event, $) {
    debugger
    const newState = {};
    newState[feild] = event.target.value;
    $.setState(newState);
}

/** 新增/修改 */
function addOrEdit(type, $) {
    // 先重置面版类型
    $.props.updateContentType(type, $.state.selectedRowKeys);
}

/** 删除 */
function remove($, url) {
    const deleteUrl = url + "delete";
    const ids = $.state.selectedRowKeys;
    var idsStr = "";
    for(var i = 0;i < ids.length;i++) {
        var id = ids[i];
        if(i < ids.length - 1) {
            idsStr += id + ",";
        }else{
            idsStr += id;
        }
    }
    const query = {
        paramsMap: { ids: idsStr }
    };
    axios.post(`${deleteUrl}`, qs.stringify(query)).then(res => {
        searchDatas("", url, $);
        $.setState({ selectedRowKeys: [] });
        showOprationState("success", "操作成功，删除" + res.data + "条数据！");
    }).catch(err => {
        showOprationState("failed", "操作失败！");
    });
}

/** 查看(此处只是跳转到显示页面) */
function info(type, $) {
    // 先重置面版类型
    $.props.updateContentType(type, $.state.selectedRowKeys);
}

/** 导出 */
function exp($, url) {

}