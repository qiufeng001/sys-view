import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, Radio } from 'antd';
import baseUrl from "../../../../../api/baseUrl";
const { TextArea } = Input;
const menuUrl = baseUrl.portal.portal + "/materials/";
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
        }).catch(err => {
            // data = [{msg : "error"}]
        });
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
                            <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                                <Input value={this.state.data.name} />
                            </Form.Item>                           
                            <Form.Item name="url" label="属性">
                                <TextArea value={this.state.data.attribute} />
                            </Form.Item>
                            <Form.Item name="url" label="功效">
                                <TextArea value={this.state.data.efficacy} />
                            </Form.Item>
                            <Form.Item name="url" label="说明">
                                <TextArea value={this.state.data.instructions} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div >
        )
    }
}

export default Info;