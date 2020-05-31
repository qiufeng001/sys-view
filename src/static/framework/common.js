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
export function validateHasParams(type, $currentComp) {
    var params = $currentComp.state.selectRow;
    if (params.length == 0 && type !== 'add') {
        alert("请选择操作对象！")
        // return false;
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
export function executeOperate(type, $currentComp, url) {
    switch (type) {
        case 'add':
            addOrEdit(type, $currentComp);
            break;
        case 'delete':
            remove($currentComp, url);
            break;
        case 'edit':
            addOrEdit(type, $currentComp);
            break;
        case 'info':
            info($currentComp, url);
            break;
        case 'export':
            exp($currentComp, url);
            break;
    }

}

/** 选项 单选 */
export function rowSelect(row, isSelected, $currentComp) {
    const selectRows = $currentComp.state.selectRow;
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
export function rowSelectAll(rows, isSelected, $currentComp) {
    const selectRows = $currentComp.state.selectRow;
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

export function searchDatas(queryParams, url, $currentComp) {
    const seachUrl = url + "list";
    axios.post(seachUrl, qs.stringify(queryParams)).then(res => {
        const datas = res.data.rows;
        $currentComp.setState({ datas: datas })
    }).catch(err => {
        // data = [{msg : "error"}]
    });
}

export function infoDetail(url, $currentComp) {
    const ifnoUrl = url + $currentComp.params[0];
    axios.get(ifnoUrl).then(res => {
        const data = res.data.rows;
        $currentComp.setState({ data: data })
    }).catch(err => {
        // data = [{msg : "error"}]
    });
}

export function changeSeachParams($currentComp, feild, event) {
    const newState = {};
    newState[feild] = event.target.value;
    $currentComp.setState(newState);
}

/** 新增/修改 */
function addOrEdit(type, $currentComp) {
    // 先重置面版类型
    $currentComp.props.updateContentType(type, $currentComp.state.selectRow);
}

/** 删除 */
function remove($currentComp, url) {
    const deleteUrl = url + "delete";
    const ids = $currentComp.state.selectRow;
    var idsStr = "";
    ids.forEach(element => {
        idsStr += element + ",";
    });
    const query = {
        paramsMap: { ids: idsStr }
    };
    axios.post(`${deleteUrl}`, qs.stringify(query)).then(res => {
        searchDatas(url, $currentComp);
        showOprationState("success", "操作成功，删除" + res.data + "条数据！");
    }).catch(err => {
        showOprationState("failed", "操作失败！");
    });
}

/** 查看(此处只是跳转到显示页面) */
function info(type, $currentComp) {
    // 先重置面版类型
    $currentComp.props.updateContentType(type, $currentComp.state.selectRow);
}

/** 导出 */
function exp($currentComp, url) {

}