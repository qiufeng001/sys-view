import React from 'react';
import '../../../src/static/style/framework/Header.css';
import { Modal, Menu, Dropdown, Tabs, Form, Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import qs from 'qs';
import axios from 'axios';
import baseUrl from "../../api/baseUrl";
import 'antd/dist/antd.css';
import { Input } from 'element-react';
const logoutUrl = baseUrl.portal.logout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;


interface IProps {
    user:any;
    menus: Array<any>;
    detailVisible: boolean;
    title: string;
    imgVisible: boolean;
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


/**
 *  菜单项加载
 */
class MenuItem extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            user: this.props.user,
            detailVisible: false,
            imgVisible: false,
            title: "",
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
            menus: this.props.menuItems
        }
      
        var files = this.props.user.files;
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
    }

    componentWillUnmount= () => {

    }

    accountDetail = () => {
        this.setState({ detailVisible: true, title: "信息明细" });
    }

    uploadImg = () => {
        this.setState({ imgVisible: true, title: "上传头像" });
    }

    imgHandleOk = e => {
        console.log(e);
        this.setState({
            imgVisible: false,
        });
    };

    imgHandleCancel = e => {
        console.log(e);
        this.setState({
            imgVisible: false,
        });
    };

    detailHandleOk = e => {
        console.log(e);
        this.setState({
            detailVisible: false,
        });
    };

    detailleCancel = e => {
        console.log(e);
        this.setState({
            detailVisible: false,
        });
    };

    handleLogout = () => {
        window.location.href = logoutUrl;
    }

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

    menuBody = () => {
        var [form] = Form.useForm();
        const { title, previewVisible, previewImage, fileList, previewTitle } = this.state;
        const { user } = this.state;
        form.setFieldsValue({"id": user.id});
        const baseInfo = (
            <Menu>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => this.uploadImg()}> 上传头像</a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => this.accountDetail()}> 个人信息</a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => this.handleLogout()}> 退出</a>
                </Menu.Item>
            </Menu>);

        const handleClickMenu = (event) => {
            this.props.handleClickMenu(event);
        }

        const changeUpload = ({ fileList: newFileList }) => {
            this.setState({ fileList: newFileList });
        };

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        return (
            <div>
                <div>
                    <Modal
                        title={title} //标题
                        visible={this.state.imgVisible} //visible 判断是否显示模态框 (true | false)
                        onOk={this.imgHandleOk}
                        onCancel={this.imgHandleCancel}
                        footer={null}
                    >
                            <Form name="shopForm" form={form} autoComplete="off">
                            <div className="editForm">
                                <Form.Item name="files" label="头像图片">
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
                                <div className="btn-gp" style={{textAlign: "center"}}>
                                    <Button
                                        style={{ width: '16%' }}
                                        htmlType="submit"
                                    >
                                        保存
                                    </Button> &nbsp;
                                    <Button
                                        style={{ width: '16%' }}
                                        htmlType="submit"
                                    >
                                        取消
                                    </Button> &nbsp;
                                </div>
                            </div>
                            <br />
                        </Form>
                    </Modal>
                </div>
                <Menu theme="dark" mode="horizontal">
                {
                        this.state.menus.map(function (item) {
                            return (<SubMenu key={item.id}
                                title={item.name}>
                                    {item.childMenus != null ? 
                                        item.childMenus.map((secItem) => (
                                            <Menu.Item key={secItem.key} title={secItem.url} onClick={handleClickMenu}>{secItem.name}</Menu.Item>
                                        )) : ''
                                    }
                                    
                            </SubMenu>)
                        })
                    }
                    <Dropdown overlay={baseInfo} className="base-info">
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            基本信息
                        </a>
                    </Dropdown>
                </Menu>
            </div>
        )
    }

    render() {
       return (<this.menuBody />)
    }
}

export default MenuItem;