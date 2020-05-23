import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import BaseBtn from '../../../framework/BaseBtn';
var { BootstrapTable, TableHeaderColumn, SearchField} = require('react-bootstrap-table');

interface IProps {
    moduleUrl: string;
    tabId: string;
    menus: any;
    operationBtns: any;
    selectRow: Array<string>;
    pageNumber: number;
    pageSize: number;
}

class List extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            moduleUrl: "/protal/menu",
            tabId: this.props.tabId,
            pageNumber: 1,
            pageSize: 10,
            menus: [],
            operationBtns: [],
            selectRow:[]
        };
        this.execute =this.execute.bind(this);
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

    /**单个选择 */
    handleRowSelect = (row, isSelected, e) => {
        const selectRows = this.state.selectRow;
        if(isSelected) {
            selectRows.push(row.id);
        }else{
            for(var i=0;i < selectRows.length;i++) {
                var exitRow = selectRows[i];
                if(exitRow == row.id) {
                    selectRows.splice(i, 1);
                    break;
                }
            }
        }
    }
    
    /** 全选 */
    handleSelectAll = (isSelected, rows) => {
        const selectRows = this.state.selectRow;
        if(isSelected) {
            for(var i=0;i < rows.length;i++) {
                var row = rows[i];
                if(selectRows.indexOf(row) == -1) {
                    selectRows.push(row.id);
                }
            }
        }else{
            selectRows.splice(0);
        }
    }

    execute = (type) => {
        var params = this.state.selectRow;
        if(type == 'edit' || type == 'info') {
            if(params.length == 0) {
                alert("请选择操作对象！")
                return;
            }
            if(params.length > 1) {
                alert("请仅选择一个对象！")
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
                <BootstrapTable
                    data={this.state.menus}
                    striped hover pagination
                    selectRow={selectRow}
                    options={options}
                    tableBodyClass='menu-tb'
                   
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

export default List;