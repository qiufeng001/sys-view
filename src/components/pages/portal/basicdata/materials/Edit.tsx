import React from 'react';
import { Form, Input, Button, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
    previewVisible: boolean;
    previewImage: string;
    previewTitle: string;
    fileList: Array<any>;
}

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
            attribute: "",
            efficacy: "",
            instructions: "",
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: []
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
                    attribute: data.attribute,
                    efficacy: data.efficacy,
                    instructions: data.instructions
                });
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

    handleCancel = () => this.setState({ previewVisible: false });

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


    FormBody = () => {
        var [form] = Form.useForm();
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const {id, name,attribute,efficacy,instructions } = this.state;
        form.setFieldsValue({"id": id, "name": name, "attribute": attribute,  "efficacy":  efficacy, "instructions": instructions});
        const changeUpload = ({ fileList: newFileList }) => {
            this.setState({ fileList: newFileList });
        };

        var onFinish = values => {
            var urlType = this.state.id == "" ? "createWithFile" : "updateWithFile";
            var url = `${menuUrl}` + urlType;
            if(this.state.id !== "") {
                values.id = this.state.id;
            }
            var files = [{}];
            files = [];
            fileList.forEach((item) => {
                var file = {"name": item.name, "thumbUrl": item.thumbUrl, "size": item.size, "type": item.type};
                files.push(file);
            });
            values.files = files;
            var data = JSON.stringify(values);
            axios({
                method: "post",
                url: url,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: data
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
                    <div className="titleDiv">材料{this.state.title}</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <Form name="materialForm" form={form} onFinish={onFinish} autoComplete="off">
                        <div className="editForm">
                            <Form.Item name="name" label="名称">
                                <Input />
                            </Form.Item>
                            <Form.Item name="attribute" label="属性">
                                <TextArea />
                            </Form.Item>
                            <Form.Item name="efficacy" label="功效">
                                <TextArea />
                            </Form.Item>
                            <Form.Item name="instructions" label="说明">
                                <TextArea />
                            </Form.Item>
                            <Form.Item name="files" label="材料图片">
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
                                    footer={null}
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
        )
    }

    render() {
       return (<this.FormBody />);
    }
}

export default Edit;