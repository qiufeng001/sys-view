import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import jQuery from "jquery";
import BaseBtn from '../../../framework/BaseBtn';
import qs from 'qs';
import axios from 'axios';
import baseConfig from "../../../../api/baseConfig";
const portalUrl = baseConfig.Config.baseUrl.portalUrl;
var { BootstrapTable, TableHeaderColumn, SearchField } = require('react-bootstrap-table');

interface IProps {
    moduleUrl: string;
    tabId: string;
    menus: any;
    operationBtns: any;
    selectRow: Array<string>;
    pageIndex: number;
    pageSize: number;
    name: string;
    code: string;
    state: any;
}

class List extends React.Component<any, IProps> {
    msg:any
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            moduleUrl: "/protal/menu",
            tabId: this.props.tabId,
            pageIndex: 1,
            pageSize: 15,
            menus: [],
            operationBtns: [],
            selectRow: [],
            name: "", 
            code:"", 
            state: ""
        };
        this.execute = this.execute.bind(this);
    }

    componentDidMount = () => {
        var menus = this.search()
        this.setState({ menus: menus });
        const state = this.props.state;
        if (state != undefined && state != "" && state != null) {
            debugger
            if (state == "success") {
                jQuery("#stateDiv")[0].style.display = "inline";
                jQuery(jQuery("#stateDiv")[0]).text("操作成功！")
                setTimeout(() => {
                    jQuery("#stateDiv")[0].style.display = "none";
                }, 2000);
            } else {
                jQuery("#stateDiv")[0].style.display = "inline";
                jQuery(jQuery("#stateDiv")[0]).text("操作失败！")
                setTimeout(() => {
                    jQuery("#stateDiv")[0].style.display = "none";
                }, 2000);
            }
        }

    }


    /** 翻页查询事件 */
    onPageChange = (pageNumber, pageSize) => {

    }

    /** 查询表单处理 */
    handleSearch = () => {
        this.search();
    }

    // 查询后台数据
    search = () => {
        const pageIndex = this.state.pageIndex;
        const pageSize = this.state.pageSize;
        const params = {
            rows: pageSize,
            pageIndex: pageIndex,
            paramsMap: {name: this.state.name, code: this.state.code, state: this.state.state}
        };

        const url = portalUrl + "/menu/list";
        axios.post(url, qs.stringify(params)).then(res => {
            const menus = res.data.rows;
            this.setState({menus: menus})
        }).catch(err => {
            // data = [{msg : "error"}]
        });;
    }

    /**单个选择 */
    handleRowSelect = (row, isSelected, e) => {
        const selectRows = this.state.selectRow;
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

    /** 全选 */
    handleSelectAll = (isSelected, rows) => {
        const selectRows = this.state.selectRow;
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

    changeSeachParams = (feild, event) => {
        const newState = {};
        newState[feild] = event.target.value;
        this.setState(newState);
    }

    stateFormatter = (cell, row) => {
        var state = "";
        if(row.state == 0) {
            state = `<i class='glyphicon glyphicon-usd'></i> 冻结`;
        }else {
            state = `<i class='glyphicon glyphicon-usd'></i> 激活`;
        }
        return state;
    }

    operationFormatter = (cell, row) => {
        
        var opt = `<button type="button" class="btn btn-primary glyphicon glyphicon-plus" onclick="edit(" + ${row.id} + ")" > 修改 </button> `;
            opt += `<button type="button" class="btn btn-primary glyphicon glyphicon-plus" onclick="delete(" + ${row.id} + ")" > 删除 </button>`;
            opt += `<button type="button" class="btn btn-primary glyphicon glyphicon-plus" onclick="info(" + ${row.id} + ")" > 查看 </button>`;
        return opt;
    }

    edit = (type, params) => {
        // 先重置面版类型
        
    }

    /** 删除 */
    delete = (type, params) => {

    }
    
    /** 查看 */
    info = (type, params) => {
        
    }
    

    execute = (type) => {
        var params = this.state.selectRow;
        if (type == 'edit' || type == 'info') {
            if (params.length == 0) {
                // Alert.Heading;
                return;
            }
            if (params.length > 1) {
                // Alert.Heading
                return;
            }
        }
        this.props.execute(type, this.state.selectRow);
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.handleRowSelect,
            onSelectAll: this.handleSelectAll
        };

        const options = {
            prePage: 'Previous',
            nextPage: 'Next',
            firstPage: 'First Page',
            lastPage: 'Last Page',
            paginationSize: 3,
            paginationShowsTotal: true,
            noDataText: 'Empty Table',
            onPageChange: this.onPageChange
        };

        return (
            <div className="bs-table-main">
                <hr />
                <div className="bs-search-main">
                    <Form onSubmitCapture={this.handleSearch} >
                        <table className="bs-search-table">
                            <tbody>
                                <tr>
                                    <td>名称： </td>
                                    <td><Input type="text" onChange={this.changeSeachParams.bind(this, "name")} /></td>
                                    <td>代码：</td>
                                    <td><Input type="text" onChange={this.changeSeachParams.bind(this, "code")} /></td>
                                    <td>状态：</td>
                                    <td>
                                    <select className="form-control"onChange={this.changeSeachParams.bind(this, "state")} >
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
                                        <button className="login-form-button" onClick={this.handleSearch}>查询 </button>&nbsp;&nbsp;&nbsp;&nbsp;
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
                <div id="stateDiv">操作成功</div>
                <BootstrapTable
                    data={this.state.menus}
                    striped hover pagination
                    selectRow={selectRow}
                    options={options}
                    tableBodyClass='menu-tb'

                >
                    <TableHeaderColumn isKey dataField='id' thStyle={ { 'hidden': 'hidden' } }>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort headerAlign='center'>菜单名</TableHeaderColumn>
                    <TableHeaderColumn dataField='code' dataSort headerAlign='center'>菜单code</TableHeaderColumn>
                    <TableHeaderColumn dataField='url' dataSort headerAlign='center'>路径</TableHeaderColumn>
                    <TableHeaderColumn dataField='state' dataSort headerAlign='center' dataFormat={ this.stateFormatter }>状态</TableHeaderColumn>
                    <TableHeaderColumn dataField='operatio' dataSort headerAlign='center' dataFormat={ this.operationFormatter }>操作</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default List;