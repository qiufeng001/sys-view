import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import BaseBtn from '../../../framework/BaseBtn';
import baseUrl from "../../../../api/baseUrl";
import baseConfig from "../../../../api/baseConfig";
import {showOprationState, validateHasParams, searchDatas, changeSeachParams,
    executeOperate, rowSelect, rowSelectAll} from '../../../../static/framework/common';
const menuUrl = baseUrl.portal.portal + "/menu/";
const basePage = baseConfig.Config.page;
var { BootstrapTable, TableHeaderColumn, SearchField } = require('react-bootstrap-table');

interface IProps {
    tabId: string;
    datas: any;
    operationBtns: any;
    selectRow: Array<string>;
    pageIndex: number;
    pageSize: number;
    name: string;
    code: string;
    state: any;
}

class List extends React.Component<any, IProps> {
    msg: any
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            tabId: this.props.tabId,
            pageIndex: basePage.pageIndex,
            pageSize: basePage.pageSize,
            datas: [],
            operationBtns: [],
            selectRow: [],
            name: "",
            code: "",
            state: ""
            
        };
        this.execute = this.execute.bind(this);
    }

    

    componentDidMount = () => {
        var datas = this.search()
        this.setState({ datas: datas });
        const state = this.props.state;
        if (state != undefined && state != "" && state != null) {
            if (state == "success") {
                showOprationState("success！")
            } else {
                showOprationState("failed", "操作失败！")
            }
        }

    }

    /** 翻页查询事件 */
    onPageChange = (pageNumber, pageSize) => {
        this.setState({pageIndex: pageNumber, pageSize: pageSize});
        this.search();
    }

    // 查询后台数据
    search = () => {
        const queryParams = {
            pageSize: this.state.pageSize,
            pageIndex: this.state.pageIndex,
            paramsMap: { name: this.state.name, code: this.state.code, state: this.state.state }
        }
        searchDatas(queryParams, menuUrl, this);
    }

    /**单个选择 */
    handleRowSelect = (row, isSelected, e) => {
        rowSelect(row, isSelected, this);
    }

    /** 全选 */
    handleSelectAll = (isSelected, rows) => {
        rowSelectAll(rows, isSelected, this);    
    }

    changeSeachParams = (feild, event) => {
       
    }

    statusFormatter = (cell, row) => {
        var statusStr = "";
        if (row.status == 0) {
            statusStr = `<i class='glyphicon glyphicon-usd'></i> 冻结`;
        } else {
            statusStr = `<i class='glyphicon glyphicon-usd'></i> 激活`;
        }
        return statusStr;
    }

    operationFormatter = (cell, row) => {
        var opt = `<button type="button" class="btn btn-primary glyphicon glyphicon-plus" onclick="edit(" + ${row.id} + ")" > 修改 &nbsp;</button> `;
        opt += `<button type="button" class="btn btn-primary glyphicon glyphicon-plus" onclick="delete(" + ${row.id} + ")" > 删除&nbsp; </button>`;
        opt += `<button type="button" class="btn btn-primary glyphicon glyphicon-plus" onclick="info(" + ${row.id} + ")" > 查看 </button>`;
        return opt;
    }

    /** 方法执行 */
    execute = (type) => {
        if(!validateHasParams(type, this)) {
            return;
        };
        executeOperate(type, this, menuUrl);
        if(type === "delete") {
            this.search();
        }
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.handleRowSelect,
            onSelectAll: this.handleSelectAll
        };

        const options = {
            prePage: basePage.prePage,
            nextPage: basePage.nextPage,
            firstPage: basePage.firstPage,
            lastPage: basePage.lastPage,
            paginationSize: basePage.paginationSize,
            paginationShowsTotal: basePage.paginationShowsTotal,
            noDataText: basePage.noDataText,
            onPageChange: this.onPageChange
        };

        return (
            <div className="bs-table-main">
                <hr />
                <div className="bs-search-main">
                    <Form>
                        <table className="bs-search-table">
                            <tbody>
                                <tr>
                                    <td>名称： </td>
                                    <td><Input type="text" onChange={changeSeachParams.bind(this, "name")} /></td>
                                    <td>代码：</td>
                                    <td><Input type="text" onChange={this.changeSeachParams.bind(this, "code")} /></td>
                                    <td>状态：</td>
                                    <td>
                                        <select className="form-control" onChange={this.changeSeachParams.bind(this, "status")} >
                                            <option value={""}>...</option>
                                            <option value={1}>激活</option>
                                            <option value={0}>冻结</option>
                                        </select>
                                    </td>
                                    <td> </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={8}>
                                        <button className="login-form-button" onClick={this.search}>查询 </button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button type="reset" className="login-form-button" style={{ marginBottom: '2px' }}>重置 </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Form>
                </div>
                <hr />
                <div className="react-bs-table-tool-bar">
                    <BaseBtn execute={this.execute} />
                </div>
                <div id="stateDiv"></div>
                <BootstrapTable
                    data={this.state.datas}
                    striped hover pagination
                    selectRow={selectRow}
                    options={options}
                    tableBodyClass='menu-tb'
                >
                    <TableHeaderColumn isKey dataField='id' visible={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort headerAlign='center'>菜单名</TableHeaderColumn>
                    <TableHeaderColumn dataField='code' dataSort headerAlign='center'>菜单编码</TableHeaderColumn>
                    <TableHeaderColumn dataField='url' dataSort headerAlign='center'>路径</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' dataSort headerAlign='center' dataFormat={this.statusFormatter}>状态</TableHeaderColumn>
                    <TableHeaderColumn dataField='operatio' dataSort headerAlign='center' dataFormat={this.operationFormatter}>操作</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default List;