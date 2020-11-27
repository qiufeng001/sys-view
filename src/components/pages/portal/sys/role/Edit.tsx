import React from 'react';
import qs from 'qs';
import { Form, Input, Select, Radio,Button } from 'antd';
import '../../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../../api/baseUrl";

const menuUrl = baseUrl.portal.portal + "/role/";
interface IProps {
    opts: Array<{menuId:string, name:string,code:string}>;
    title: string;
    params: Array<string>;
    id: string;
    roleNo: string;
    name: string;
    status: string;
    createUser: string;
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
            roleNo: "",
            name: "",
            status: "",
            createUser: ""
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
                    id: data.id, roleNo: data.roleNo, name: data.name, status: data.status
                })
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

    FormBody  = () => {
        var [form] = Form.useForm();
        var {id, name, roleNo, status} = this.state;
        form.setFieldsValue({"id": id, "name": name, "roleNo": roleNo,  "status":  status});
        
        var onFinish = values => {
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
                            <Form.Item name="roleNo" label="角色编号" rules={[{ required: true }]}>
                                <Input value={roleNo} />
                            </Form.Item>
                            <Form.Item name="name" label="角色名" rules={[{ required: true }]}>
                                <Input value={name} />
                            </Form.Item>
                            <Form.Item name="status" label="状态" rules={[{ required: true }]}>
                                <Radio.Group value={status}>
                                    <Radio value={1}>激活</Radio>
                                    <Radio value={0}>冻结</Radio>
                                </Radio.Group>
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