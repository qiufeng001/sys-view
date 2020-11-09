import React from 'react';
import qs from 'qs';
import { Form, Input, Select, Radio } from 'antd';
import '../../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../../api/baseUrl";
const { TextArea } = Input;
const menuUrl = baseUrl.portal.portal + "/materials/";

interface IProps {
    opts: Array<any>;
    title: string;
    params: Array<string>;
    id: string;
    name: string;
    attribute: string;
    efficacy: string;
    instructions: string;
}

const { Option } = Select;


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};



class Edit extends React.Component<any, IProps> {
    name: any
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            opts: [],
            title: "新增",
            params: this.props.params,
            id: "",
            name: "",
            attribute: "",
            efficacy: "",
            instructions: ""
        };
    }

    componentDidMount = () => {
        var params = this.state.params;
        if (params != undefined && params.length > 0) {
            this.setState({ title: "修改" });
            // 读取数据
            axios.get(`${menuUrl}` + this.state.params[0]).then(res => {
                const data = res.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    attribute: data.attribut, 
                    efficacy: data.efficacy,
                    instructions: data.instructions
                });
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

    /**输入框事件 */
    handleChange = (name, event) => {
        debugger
        const newState = {};
        const value = event.target.value;
        newState[name] = value;
        this.setState(newState);
    };

    // 重置
    reset = (e: React.FormEvent) => {
        this.setState({ name: "", attribute: "", efficacy: "", instructions: "" });
    }

    submit = (e: React.FormEvent) => {
        var urlType = this.state.id == "" ? "create" : "update";
        var url = `${menuUrl}` + urlType;
        var menu = {
            id: this.state.id,
            name: this.state.name,
            attribute: this.state.attribute,
            efficacy: this.state.efficacy,
            instructions: this.state.instructions
        };
        var data = qs.stringify(menu);
        axios({
            method: "post",
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: data
        }).then((res) => {
            this.props.resFun("success");
        }).catch(err => {
            this.props.resFun("failed");
        });

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
                    <Form {...layout} name="control-hooks">
                        <div className="editForm">
                            <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                                <Input value={this.state.name}  onChange={this.handleChange.bind(this, "name")}/>
                            </Form.Item>                           
                            <Form.Item name="attribute" label="属性">
                                <TextArea value={this.state.attribute} onChange={this.handleChange.bind(this, "attribute")}/>
                            </Form.Item>
                            <Form.Item name="efficacy" label="功效">
                                <TextArea value={this.state.efficacy}  onChange={this.handleChange.bind(this, "efficacy")}/>
                            </Form.Item>
                            <Form.Item name="instructions" label="说明">
                                <TextArea value={this.state.instructions}  onChange={this.handleChange.bind(this, "instructions")}/>
                            </Form.Item>
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
                        </div>

                        <br />
                    </Form>
                </div>
            </div>
        )
    }
}

export default Edit;