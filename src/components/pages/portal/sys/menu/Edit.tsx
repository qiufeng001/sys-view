import React from 'react';
import qs from 'qs';
import { Form, Input, Select, Radio,Button } from 'antd';
import '../../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../../api/baseUrl";

const menuUrl = baseUrl.portal.portal + "/menu/";
interface IProps {
    opts: Array<{menuId:string, name:string,code:string}>;
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
            code: "",
            name: "",
            status: 1,
            sequence: 1,
            url: "",
            pId: ""
        };
    }

    componentDidMount = () => {
        var params = this.state.params;
        var pId = null;
        if (params != undefined && params.length > 0) {
            this.setState({ title: "修改" });
            // 读取数据  
            axios.get(`${menuUrl}` + this.state.params[0]).then(res => {
                const data = res.data;
                this.setState({
                    id: data.id, code: data.code,
                    name: data.name, url: data.url == null ? "" : data.url, pId: data.pId
                })
                pId = data.pId;

            }).catch(err => {
                alert("系统出错！请联系管理员！")
            });
        } else {
            this.setState({ title: "新增" })
        }
        // 加载下拉框
        const commonMenuUrl = baseUrl.portal.portal + "/common/getMenu";
        singleSelect(commonMenuUrl, this);

        /** 单选下拉框 
          * currentVal: 对象原有值
          * isShowCode: 是否显示code
          */
         async function singleSelect(url, $) {
            const opts = new Array<any>();
            await axios.get(url).then(res => {
                const data = res.data;
                data.forEach(element => {
                    var menu = {menuId:"", name:"", code:""};
                    menu.menuId = element.id;
                    menu.name = element.name;
                    menu.code = element.code;
                    opts.push(menu);
                });
                $.setState({ opts: opts });
            }).catch(err => {
                alert("系统出错！请联系管理员！")
            });
        }
    }

    /** 后退 */
    backExecute = () => {
        this.props.backExecute(this.props.params);
    }

    /**输入框事件 */
    handleChange = (name, event) => {
        var newState = {};
        var value = "";
        if(name == 'pId') {
            value = event;
        }else {
            value = event.target.value;
        }
         
        newState[name] = value;
        this.setState(newState);
    };

    // 重置
    reset = (e: React.FormEvent) => {
        this.setState({ code: "", name: "", url: "", sequence: 1 });
    }

    FormBody  = () => {
        var [form] = Form.useForm();
        var {id, name, code, status, url, sequence,pId} = this.state;
        form.setFieldsValue({"id": id, "name": name, "code": code,  "status":  status, "url": url, "sequence": sequence, "pId":pId});
        
        var onFinish = values => {
            debugger
            var urlType = this.state.id == "" ? "create" : "update";
            var url = `${menuUrl}` + urlType;
            if(this.state.id !== "") {
                values.id = this.state.id;
            }
            var params = qs.stringify(values);
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
            });
        };

        return (
            <div className="bs-table-main">
                <div className="formHeader">
                    <div className="titleDiv">菜单{this.state.title}</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <Form name="menuForm" form={form} onFinish={onFinish} autoComplete="off">
                        <div className="editForm">
                            <Form.Item name="code" label="编码" rules={[{ required: true }]}>
                                <Input value={this.state.code} onChange={this.handleChange.bind(this, "code")}/>
                            </Form.Item>
                            <Form.Item name="name" label="菜单名" rules={[{ required: true }]}>
                                <Input value={this.state.name} onChange={this.handleChange.bind(this, "name")}/>
                            </Form.Item>
                            <Form.Item name="sequence" label="排序" rules={[{ required: true }]}>
                                <Input value={this.state.sequence} onChange={this.handleChange.bind(this, "sequence")}/>
                            </Form.Item>
                            <Form.Item name="status" label="状态" rules={[{ required: true }]}>
                                <Radio.Group onChange={this.handleChange.bind(this, "status")} value={this.state.status}>
                                    <Radio value={1}>激活</Radio>
                                    <Radio value={0}>冻结</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="路径" name="url">
                                <Input value={this.state.url} onChange={this.handleChange.bind(this, "url")}/>
                            </Form.Item>
                            <Form.Item label="上級菜单" name="pId">
                                <Select
                                    onChange={this.handleChange.bind(this, "pId")}
                                    key={pId}
                                    defaultValue={ pId }
                                    showSearch
                                >
                                    <Option value='' >...</Option>                              
                                    {
                                        this.state.opts.map(item => (
                                            <Select.Option key={item.menuId} defaultValue={this.state.pId} value={item.menuId}>{item.name}({item.code})</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <div className="btn-gp">
                                <Button
                                    style={{ width: '10%' }}
                                    htmlType="submit"
                                >
                                    保存
                                </Button> &nbsp;
                            </div>
                        </div>

                        <br />
                    </Form>
                </div>
            </div>
        );
    }

    render() {
        return (<this.FormBody />)
    }
}

export default Edit;