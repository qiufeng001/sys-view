import React from 'react';
import qs from 'qs';
import { Form, Input, Select, Radio,Button } from 'antd';
import '../../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../../api/baseUrl";

const menuUrl = baseUrl.portal.portal + "/user/";
interface IProps {
    opts: Array<{menuId:string, name:string,code:string}>;
    title: string;
    params: Array<string>;
    id: string;
    account: string;
    name: string;
    status: number;
    remark: string;
    submited:boolean;
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
            account: "",
            name: "",
            status: 1,
            remark: "",
            submited:true
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
                    id: data.id, account: data.account,
                    name: data.name, status: data.status, remark: data.remark
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
    validateAccount = (name, event) => {
        var params = {"account": event.target.value};
        this.setState({ title: "修改" });
        var url = baseUrl.portal + "/common/validate"
        // 读取数据  
        axios({
            method: "post",
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: qs.stringfy(params)
        }).then((res) => {
            debugger
            if(res.data > 0) {
                this.setState({submited: false});
            }
        }).catch(err => {
            this.props.resFun("failed");
        });
        
    };

    FormBody  = () => {
        var [form] = Form.useForm();
        var {id, name, account, status, remark} = this.state;
        form.setFieldsValue({"id": id, "name": name, "account": account,  "status":  status});
        
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
                            <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="account" label="账号" rules={[{ required: true }]}>
                                <Input onChange={this.validateAccount.bind(this, "account")} />
                            </Form.Item>
                            <Form.Item name="status" label="状态" rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio value={1}>激活</Radio>
                                    <Radio value={0}>冻结</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="说明" name="remark">
                                <Input />
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