import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, Radio } from 'antd';
import baseUrl from "../../../../../api/baseUrl";
const menuUrl = baseUrl.portal.portal + "/user/";
interface IProps {
    params: Array<string>;
    data: any;
    opts: Array<any>;
    statusRadio: boolean;
}

class Info extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            params: this.props.params[0],
            data: {},
            opts: [],
            statusRadio: true
        };
    }

    componentDidMount = () => {
        const infoUrl = `${menuUrl}` + this.state.params;
        axios.get(infoUrl).then(res => {
            const data = res.data;
            this.setState({ data: data });
            if (data.status == 0) {
                this.setState({ statusRadio: false });
            }
            // 加载下拉框
            const commonMenuUrl = baseUrl.portal.portal + "/common/getMenu";
            singleSelect(commonMenuUrl, data.pId, true, this);
        }).catch(err => {
            // data = [{msg : "error"}]
        });

        /** 单选下拉框 
          * currentVal: 对象原有值
          * isShowCode: 是否显示code
          */
        function singleSelect(url, parentVal, isShowCode, $) {
            const opts = new Array<any>();
            axios.get(url).then(res => {
                const data = res.data;
                data.forEach(element => {
                    if (parentVal != "" && element.id == parentVal) {
                        if (isShowCode != null && isShowCode) {
                            opts.push(<option value={element.id} key={element.id} selected>{element.name}({element.code})</option>);
                        } else {
                            opts.push(<option value={element.id} key={element.id} selected>{element.name}</option>);
                        }
                    } else {
                        if (isShowCode != null && isShowCode) {
                            opts.push(<option value={element.id} key={element.id} >{element.name}({element.code})</option>);
                        } else {
                            opts.push(<option value={element.id} key={element.id} >{element.name}</option>);
                        }
                    }
                });
                $.setState({ opts: opts });
            }).catch(err => {
                alert("系统出错！请联系管理员！")
            });
        }
    }

    backExecute = () => {
        this.props.backExecute(this.props.params);
    }


    render() {
        return (
            <div className="bs-table-main">
                <div className="formHeader">
                    <div className="titleDiv">菜单明细</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <div className="editForm">
                        <Form>

                            <Form.Item name="code" label="编码" rules={[{ required: true }]}>
                                <Input value={this.state.data.code} />
                            </Form.Item>
                            <Form.Item name="name" label="菜单名" rules={[{ required: true }]}>
                                <Input value={this.state.data.name} />
                            </Form.Item>
                            <Form.Item name="sequence" label="排序" rules={[{ required: true }]}>
                                <Input value={this.state.data.sequence} />
                            </Form.Item>
                            <Form.Item name="radio-group" label="Radio.Group">
                                <Radio value="1" >激活</Radio>
                                <Radio value="0">冻结</Radio>
                            </Form.Item>
                            <Form.Item name="url" label="路径">
                                <Input value={this.state.data.url} />
                            </Form.Item>

                            <Form.Item name="pId" label="上級菜单" >
                                <Select
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                >
                                    {this.state.opts}
                                </Select>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div >
        )
    }
}

export default Info;