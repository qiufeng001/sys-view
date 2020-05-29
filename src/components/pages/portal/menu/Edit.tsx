import React from 'react';
import qs from 'qs';
import { FormGroup, FormControl, FormLabel, ButtonGroup, Button, FormCheck } from 'react-bootstrap';
import '../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../api/baseUrl";
const menuUrl = baseUrl.portal.portal + "/menu/";
interface IProps {
    title: string;
    params: Array<string>;
    id: string;
    code: string;
    name: string;
    status: number;
    sequence: number;
    url: "";
    pId: "";
}

class Edit extends React.Component<any, IProps> {
    name: any
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            title: "新增",
            params: this.props.params,
            id: "",
            code: "",
            name: "",
            status: 1,
            sequence: 1,
            url: "",
            pId: ""
        };
    }

    componentDidMount = () => {
        var parmsLength = this.state.params.length;
        if (parmsLength > 0) {
            this.setState({ title: "修改" });
            debugger
            // 读取数据
            axios.get(`${menuUrl}` + this.state.params[0]).then(res => {
                const data = res.data;
                this.setState({ id: data.id,  code: data.code, name: data.name, url: data.url == null ? "" : data.url })
            }).catch(err => {
                alert("系统出错！请联系管理员！")
            });
        } else {
            this.setState({ title: "新增" })
        }
    }

    /** 后退 */
    backExecute = () => {
        this.props.backExecute(this.props.params);
    }

    query = {
        name: {
            value: '',
            validata: [
                {
                    errMessage: '名称必填',
                    test: (value) => {
                        return value;
                    }
                }
            ]
        },
        code: {
            value: '',
            validata: [
                {
                    errMessage: '编码必填',
                    test: (value) => {
                        return value;
                    }
                }
            ]
        },
        sequecne: {
            value: '',
            validata: [
                {
                    errMessage: '排序必填',
                    test: (value) => {
                        return value;
                    }
                }
            ]
        },
        url: {
            value: '',
            validata: [
                {
                    errMessage: '路径必填',
                    test: (value) => {
                        return value;
                    }
                }
            ]
        }
    }

    /**输入框事件 */
    handleChange = (name, event) => {
        debugger
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
        for (let key in this.query) {
            if (key === name) {
                this.query[key].value = event.target.value;
            }
        }
    };

    // 重置
    reset = (e: React.FormEvent) => {
        this.setState({code:"", name: "", url: "", sequence:1 });
    }

    submit = (e: React.FormEvent) => {
        var url = `${menuUrl}` + "create";
        var menu = {
            id: this.state.id,
            code: this.state.code,
            name: this.state.name,
            status: this.state.status,
            sequence: this.state.sequence,
            url: this.state.url,
            pId: this.state.pId
        };
        debugger
        var data = qs.stringify(menu);

        axios.post(url, data).then(res => {
            this.props.resFun("success");
        }).catch(err => {
            this.props.resFun("failed");
        });;

    }

    render() {
        return (
            <div className="bs-table-main">
                <div className="formHeader">
                    <div className="titleDiv">菜单{this.state.title}</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <div className="editForm">
                        <form>
                            <FormGroup>
                                <FormLabel>编码：</FormLabel>
                                <FormControl type="text"
                                    onChange={this.handleChange.bind(this, 'code')}
                                    value={this.state.code} placeholder="请输入编码" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>菜单名：</FormLabel>
                                <FormControl type="text"
                                    onChange={this.handleChange.bind(this, 'name')}
                                    value={this.state.name} placeholder="请输入菜单名" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>排序：</FormLabel>
                                <FormControl type="text"
                                    onChange={this.handleChange.bind(this, 'sequence')}
                                    value={this.state.sequence} placeholder="请输入排序" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>状态：</FormLabel>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="enableCheck" value="1" checked 
                                        onChange={this.handleChange.bind(this, 'status')}/>
                                    <label className="form-check-label" htmlFor="enableCheck">
                                        激活
                                    </label>
                                </div>&nbsp;&nbsp;&nbsp;
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="disableCheck" value="0" 
                                        onChange={this.handleChange.bind(this, 'status')}/>
                                    <label className="form-check-label" htmlFor="disableCheck">
                                        冻结
                                    </label>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>路&nbsp;&nbsp;&nbsp;&nbsp;径：</FormLabel>
                                <FormControl type="text" value={this.state.url}
                                    onChange={this.handleChange.bind(this, 'url')}
                                    placeholder="请输入url" />
                                <FormControl.Feedback />
                            </FormGroup>
                            <div className="form-group">
                                <label >上级菜单:</label>
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="btn-gp">
                                <button
                                    type="button"
                                    style={{ width: '10%' }}
                                    onClick={this.submit}
                                >
                                    保存
                                </button> &nbsp;
                                <button
                                    type="reset"
                                    style={{ width: '10%' }}
                                    onClick={this.reset}
                                >
                                    重置
                                </button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Edit;