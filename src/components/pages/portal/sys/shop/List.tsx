import React from 'react';
import { Form, Input, Table } from 'antd';
import BaseBtn from '../../../../framework/BaseBtn';
import baseUrl from "../../../../../api/baseUrl";
import baseConfig from "../../../../../api/baseconfig";
import {
    showOprationState, validateHasParams, searchDatas, changeSeachParams,
    executeOperate} from '../../../../../static/framework/common';
const menuUrl = baseUrl.portal.portal + "/shop/";
const basePage = baseConfig.Config.page;

const columns = [
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '编号',
        dataIndex: 'code'
    },
    {
        title: '负责人',
        dataIndex: 'header'
    },
    {
        title: '负责人电话',
        dataIndex: 'phone'
    },
    {
        title: '店面电话',
        dataIndex: 'tel'
    }
];

interface IProps {
    tabId: string;
    datas: any;
    operationBtns: any;
    selectedRowKeys: Array<string>;
    pageIndex: number;
    pageSize: number;
    total: number;
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
            total: basePage.total,
            datas: [],
            operationBtns: [],
            selectedRowKeys: [],
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
            if (state === "success") {
                showOprationState("success！")
            } else {
                showOprationState("failed", "操作失败！")
            }
        }
    }

    /** 翻页查询事件 */
    onPageChange = (pageNumber, pageSize) => {
        this.setState({ pageIndex: pageNumber, pageSize: pageSize });
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

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    changeSeachParams = (feild, event) => {
        changeSeachParams(feild, event, this);
    }

    statusFormatter = (cell, row) => {
        var statusStr = "";
        if (row.status === 0) {
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
        if (!validateHasParams(type, this)) {
            return;
        };
        executeOperate(type, this, menuUrl);
        if (type === "delete") {
            this.search();
        }
    }

    render() {
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'odd',
                    text: '奇数行',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: '偶数行',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };

        return (
            <div className="bs-table-main">
                <div className="bs-search-main">
                    <Form>
                        <table className="bs-search-table">
                            <tbody>
                                <tr>
                                    <td><label>名称：</label></td>
                                    <td><Input type="text" onChange={this.changeSeachParams.bind(this, "name")} /></td>
                                    <td>代码：</td>
                                    <td><Input type="text" onChange={this.changeSeachParams.bind(this, "code")} /></td>
                                    <td>状态：</td>
                                    <td>
                                        <select style={{width: "70px"}} className="form-control" onChange={this.changeSeachParams.bind(this, "status")} >
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
                <div className="react-bs-table-tool-bar">
                    <BaseBtn execute={this.execute} />
                </div>
                <div id="stateDiv"></div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.datas} rowKey="id" />
            </div>
        )
    }
}

export default List;