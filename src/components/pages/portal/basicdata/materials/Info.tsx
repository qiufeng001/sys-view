import React from 'react';
import axios from 'axios';
import { Input, Upload,Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import baseUrl from "../../../../../api/baseUrl";
const { TextArea } = Input;
const menuUrl = baseUrl.portal.portal + "/materials/";
interface IProps {
    params: Array<string>;
    data: any;
    opts: Array<any>;
    fileList: Array<any>;
    previewVisible: boolean;
    previewImage: string;
    previewTitle: string;
}

class Info extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            params: this.props.params[0],
            data: {},
            opts: [],
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: []
        };
    }

    componentDidMount = () => {
        const infoUrl = `${menuUrl}` + this.state.params;
        axios.get(infoUrl).then(res => {
            const data = res.data;
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

            this.setState({ data: data });
        }).catch(err => {
            // data = [{msg : "error"}]
        });
    }

    backExecute = () => {
        this.props.backExecute(this.props.params);
    }

    handlePreview = async file => {
        file.preview = file.thumbUrl;
        this.setState({
            previewImage: file.thumbUrl,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.thumbUrl.lastIndexOf('/') + 1),
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;

        return (
            <div className="bs-table-main">
                <div className="formHeader">
                    <div className="titleDiv">配料明细</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <div className="editForm">
                        名称: <Input value={this.state.data.name} />
                        属性: <TextArea value={this.state.data.attribute} style={{ height: 80 }} />
                        功效: <TextArea value={this.state.data.efficacy} style={{ height: 80 }} />
                        说明: <TextArea value={this.state.data.instructions} style={{ height: 150 }} />
                        <div>
                            材料图片：
                        <Upload
                                listType="picture-card"
                                onPreview={this.handlePreview}
                                fileList={fileList}
                            >
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={this.handleCancel}
                        >
                            <img alt="example" style={{ width: '100%',height:'80%'}} src={previewImage} />
                        </Modal>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Info;