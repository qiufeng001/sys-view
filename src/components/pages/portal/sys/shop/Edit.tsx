import React from 'react';
import { Form, Upload, Input, Select, Radio, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../../../../static/style/framework/Edit.css';
import axios from 'axios';
import baseUrl from "../../../../../api/baseUrl";

const menuUrl = baseUrl.portal.portal + "/shop/";
interface IProps {
    opts: Array<{id: string, name : string, account : string}>;
    title: string;
    params: Array<string>;
    id: string;
    name: string;
    address: string;
    phone: string;
    tel: string;
    status: number;
    code:string;
    header:string;
    previewVisible: boolean;
    previewImage: string;
    previewTitle: string;
    fileList: Array<any>;
}

const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

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
            address: "",
            phone: "",
            tel: "",
            status: 1,
            code:"",
            header:"",
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: []
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
                    id: data.id, 
                    name: data.name,
                    address: data.address, 
                    phone: data.phone, 
                    tel: data.tel,
                    status: data.status,
                    header: data.header,
                    code: data.code,
                    previewVisible: false,
                    previewImage: '',
                    previewTitle: '',
                })
                var files = data.files;
                if (files !== null) {
                    var fileList = [{}];
                    fileList = [];
                    var uid = -1;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var fileObj = {
                            "name": file.name,
                            "uid": uid,
                            "thumbUrl": file.thumbUrl,
                            "type": "images/" + file.type
                        };
                        uid--;
                        fileList.push(fileObj);
                    }
                    this.setState({ fileList: fileList });
                }
            }).catch(err => {
                alert("系统出错！请联系管理员！")
            });
        } else {
            this.setState({ title: "新增" })
        }
         // 加载下拉框
         const commonMenuUrl = baseUrl.portal.portal + "/user/list";
         singleSelect(commonMenuUrl, this);

          /** 单选下拉框 
          * currentVal: 对象原有值
          * isShowCode: 是否显示code
          */
         async function singleSelect(url, $) {
            const opts = new Array<any>();
            await axios.get(url).then(res => {
                const data = res.data.rows;
                data.forEach(element => {
                    var user = {id : "", name : "", account: ""};
                    user.id = element.id;
                    user.name = element.name;
                    user.account = element.account;
                    opts.push(user);
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

    handleChange = (name, event) => {
        var newState = {};
        var value = "";
        value = event;
        newState[name] = value;
        this.setState(newState);
    };

    handlePreview = async file => {
        if(file.lastModified !== undefined) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
    
            this.setState({
                previewImage: file.url || file.preview,
                previewVisible: true,
                previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
            });
        }else{
            file.preview = file.thumbUrl;
            this.setState({
                previewImage: file.thumbUrl,
                previewVisible: true,
                previewTitle: file.name || file.url.substring(file.thumbUrl.lastIndexOf('/') + 1),
            });
        }
        
    };

    handleCancel = () => this.setState({ previewVisible: false });

    FormBody  = () => {
        var [form] = Form.useForm();
        var {id, name, address, status, phone, tel,code, header } = this.state;
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        form.setFieldsValue({"id": id, "name": name, "address": address,  "status":  status, "phone": phone, "tel": tel, "code": code, "header": header});
        const changeUpload = ({ fileList: newFileList }) => {
            this.setState({ fileList: newFileList });
        };
        var onFinish = values => {
            var urlType = this.state.id == "" ? "createWithFile" : "updateWithFile";
            var url = `${menuUrl}` + urlType;
            if(this.state.id !== "") {
                values.id = this.state.id;
            }
            values.header = this.state.header;
            var files = [{}];
            files = [];
            fileList.forEach((item) => {
                var file = {"name": item.name, "thumbUrl": item.thumbUrl, "size": item.size, "type": item.type};
                files.push(file);
            });
            values.files = files;
            var params = JSON.stringify(values);
            axios({
                method: "post",
                url: url,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: params
            }).then((res) => {
                this.props.resFun("success");
            }).catch(err => {
                this.props.resFun("failed");
            });
        };
    
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        return (
            <div className="bs-table-main">
                <div className="formHeader">
                    <div className="titleDiv">菜单{this.state.title}</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <Form name="shopForm" form={form} onFinish={onFinish} autoComplete="off">
                        <div className="editForm">
                            <Form.Item name="code" label="代码">
                                <Input />
                            </Form.Item>
                            <Form.Item name="name" label="名称">
                                <Input />
                            </Form.Item>
                            <Form.Item name="phone" label="负责人手机">
                                <Input />
                            </Form.Item>
                            <Form.Item name="tel" label="门店电话">
                                <Input />
                            </Form.Item>
                            <Form.Item name="address" label="门店地址">
                                <Input />
                            </Form.Item>
                            <Form.Item name="status" label="状态">
                                <Radio.Group value={this.state.status}>
                                    <Radio value={1}>激活</Radio>
                                    <Radio value={0}>冻结</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="负责人" name="header">
                                <Select
                                    key={header}
                                    defaultValue={ header }
                                    showSearch
                                    onChange={this.handleChange.bind(this, "header")}
                                >
                                    <Option value='' >...</Option>                              
                                    {
                                        this.state.opts.map(item => (
                                            <Select.Option key={item.id} defaultValue={this.state.header} value={item.id}>{item.name}({item.account})</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="files" label="门店图片">
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={changeUpload}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    title={previewTitle}
                                    onCancel={this.handleCancel}
                                >
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
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