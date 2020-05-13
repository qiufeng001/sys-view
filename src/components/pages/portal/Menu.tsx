import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
var { BootstrapTable, TableHeaderColumn, SearchField } = require('react-bootstrap-table');
import BaseBtn from '../../framework/BaseBtn';
interface IProps {
    tabId: string;
    menus: any;
    operationBtns: any;
    pageNumber: number;
    pageSize: number;
}

class Menu extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            tabId: this.props.tabId,
            pageNumber: 1,
            pageSize: 10,
            menus: [],
            operationBtns: []
        };
    }

    componentDidMount = () => {
        var menus = [{
            id: 1, name: "test", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 2, name: "test1", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 3, name: "test2", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 4, name: "test3", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 5, name: "test1", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 6, name: "test2", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 7, name: "test3", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 8, name: "test1", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 9, name: "test2", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 10, name: "test3", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 11, name: "test1", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 12, name: "test2", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 13, name: "test3", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 14, name: "test1", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 15, name: "test2", sex: "男", address: "h测试时", phone: "15900054828243sss"
        }, {
            id: 16, name: "test3", sex: "男", address: "h测试时", phone: "15900054828243"
        }, {
            id: 17, name: "test1", sex: "男", address: "h测试时", phone: "15900054828243"
        }, {
            id: 18, name: "test2", sex: "男", address: "h测试时", phone: "15900054828243"
        }, {
            id: 19, name: "test3", sex: "男", address: "h测试时", phone: "15900054828243"
        }]
        this.setState({ menus: menus });
    }

    /** 翻页查询事件 */
    onPageChange = (pageNumber, pageSize) => {

    }

    /** 查询表单处理 */
    handleSearch = () => {

    }

    // 查询后台数据
    search = () => {
        var pageNumber = this.state.pageNumber;
        var pageSize = this.state.pageSize;

    }

    render() {
        const selectRow = {
            mode: 'checkbox'
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
                            <tr>
                                <td>名称： </td>
                                <td><Input type="text" /></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td> </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={8}>
                                    <button className="login-form-button" onClick={this.handleSearch}>查询 </button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button className="login-form-button" onClick={this.handleSearch} style={{ marginBottom: '2px' }}>重置 </button>
                                </td>
                            </tr>
                        </table>
                    </Form>
                </div>
                <hr />
                <div className="react-bs-table-tool-bar">
                    <BaseBtn />
                </div>
                <BootstrapTable
                    data={this.state.menus}
                    striped hover pagination
                    selectRow={selectRow}
                    options={options}
                >
                    <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort headerAlign='center'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='sex' dataSort headerAlign='center'>Sex</TableHeaderColumn>
                    <TableHeaderColumn dataField='address' dataSort headerAlign='center'>Adress</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone' dataSort headerAlign='center'>Phone</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default Menu;