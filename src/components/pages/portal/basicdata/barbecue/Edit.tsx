import React from 'react';
import { Form, Input, Select, Upload, Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import qs from 'qs';
import '../../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../../api/baseUrl";
const { TextArea } = Input;
const menuUrl = baseUrl.portal.portal + "/barbecue/";

interface IProps {
    opts: Array<any>;
    title: string;
    params: Array<string>;
    id: string;
    name: string;
    method: string;
    ingredients: string;
    remark: string;
    tag: string;
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
            method: "",
            ingredients: "",
            remark: "",
            tag: ""
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
                    method: data.method,
                    ingredients: data.ingredients,
                    remark: data.remark,
                    tag: data.tag
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
        const newState = {};
        const value = event.target.value;
        newState[name] = value;
        this.setState(newState);
    };

    // 重置
    reset = (e: React.FormEvent) => {
        this.setState({ name: "", method: "", ingredients: "", remark: "", tag:"" });
    }

    FormBody = () => {
        var {id, name,  method, ingredients, remark, tag} = this.state;
        var [form] = Form.useForm();
        form.setFieldsValue({"id": id,"name": name, "method": method, "ingredients": ingredients, "remark": remark, "tag": tag});
        var onFinish = values => {
            var urlType = this.state.id == "" ? "create" : "update";
            var url = `${menuUrl}` + urlType;
            if(this.state.id !== "") {
                values.id = this.state.id;
            }
            var params = qs.stringify(values);
            debugger
            axios({
                method: "post",
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: params
            }).then((res) => {
                this.props.resFun("success");
            }).catch(err => {
                this.props.resFun("failed");
            })
        };

        return (
            <div className="bs-table-main">
                <div className="formHeader">
                    <div className="titleDiv">菜单{this.state.title}</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <div className="formBody">
                        <Form name="barbecueForm" onFinish={onFinish} autoComplete="off" form={form}>
                            <Form.Item name="id" label="主键" hidden>
                                <Input />
                            </Form.Item>   
                            <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>       
                            <Form.Item name="method" label="方法">
                                <TextArea value={this.state.method} />
                            </Form.Item>
                            
                            <Form.Item name="ingredients" label="配料">
                                <TextArea value={this.state.ingredients} />
                            </Form.Item>
                            <Form.Item name="tag" label="标签"  rules={[{ required: true }]}>
                                <TextArea value={this.state.tag} />
                            </Form.Item>
                            <Form.Item name="remark" label="说明">
                                <TextArea value={this.state.remark} />
                            </Form.Item>
                        
                            <div className="btn-gp">
                                    <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    保存
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
    
    render() {
        const {name} = this.state;
        return (<this.FormBody />) 
    }
}

export default Edit;