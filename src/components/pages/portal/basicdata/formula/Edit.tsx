import React from 'react';
import qs from 'qs';
import { Form, Input, Select, Button,Space } from 'antd';
import '../../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../../api/baseUrl";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
const { TextArea } = Input;
const menuUrl = baseUrl.portal.portal + "/formula/";

interface IProps {
    opts: Array<any>;
    title: string;
    params: Array<string>;
    id: string;
    name: string;
    steps: string;
    remark: string;
    materials:Array<any>;
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
            steps: "",
            remark: "",
            materials: []
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
                    steps: data.steps,
                    remark: data.remark
                });
            }).catch(err => {
                alert("系统出错！请联系管理员！")
            });
        } else {
            this.setState({ title: "新增" })
        }
        // 获取所有材料
        this.genMaterials();
    }

    genMaterials = () => {
        const materialUrl = baseUrl.portal.portal + "/materials/getAll"
        axios.get(materialUrl).then(res => {
            var data = res.data;
            var materials = [{}];
            materials = [];
            for(var i = 0;i < data.length;i++) {
                var material = {"id":"","name":""};
                material.id = data[i].id;
                material.name = data[i].name;
                materials.push(material);
            }
            this.setState({
                materials: materials
            });
        }).catch(err => {
            alert("系统出错！请联系管理员！")
        });
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
        this.setState({ name: "", steps: "", remark: "" });
    }

    submit = (e: React.FormEvent) => {
       

    }

    FormBody  = () => {
        var [form] = Form.useForm();

        var onFinish = values => {
            var urlType = this.state.id == "" ? "createByJson" : "updateByJson";
            var url = `${menuUrl}` + urlType;
            if(this.state.id !== "") {
                values.id = this.state.id;
            }
            var params = JSON.stringify(values);
            axios({
                method: "post",
                url: url,
                headers: {
                    'Content-Type': 'application/json'
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
                    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                        <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                            <Input value={this.state.name}  onChange={this.handleChange.bind(this, "name")}/>
                        </Form.Item>                           
                        <Form.Item name="steps" label="步骤">
                            <TextArea value={this.state.steps} onChange={this.handleChange.bind(this, "steps")}/>
                        </Form.Item>
                        <Form.Item name="remark" label="说明">
                            <TextArea value={this.state.remark} onChange={this.handleChange.bind(this, "remark")}/>
                        </Form.Item>
                        <div style={{textAlign:"center"}}>配料配比设置<hr/></div>
                        <Form.List name="details">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(field => (
                                        <Space key={field.key} align="baseline">
                                            <Form.Item
                                                noStyle
                                                shouldUpdate={(prevValues, curValues) =>
                                                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                }
                                            >
                                                {() => (
                                                    <Form.Item
                                                        {...field}
                                                        label="材料"
                                                        name={[field.name, 'materialId']}
                                                        fieldKey={[field.fieldKey, 'material']}
                                                        rules={[{ required: true, message: '请选择材料！' }]}
                                                    >
                                                        <Select style={{ width: 130 }}>
                                                            {this.state.materials.map(item => (
                                                                <Option key={item.id} value={item.id}>
                                                                    {item.name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="配比"
                                                name={[field.name, 'preparateRate']}
                                                fieldKey={[field.fieldKey, 'price']}
                                                rules={[{ required: true, message: '填写配比！' }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="说明"
                                                name={[field.name, 'remark']}
                                                fieldKey={[field.fieldKey, 'remark']}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>
                                    ))}

                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                             添加
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <div className="btn-gp">
                                <Button
                                type="primary"
                                htmlType="submit"
                                onClick={this.submit}
                            >
                                保存
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

    render() {
        return (
            <this.FormBody />
        )
    }
}

export default Edit;