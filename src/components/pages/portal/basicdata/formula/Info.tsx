import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, Radio } from 'antd';
import baseUrl from "../../../../../api/baseUrl";
const { TextArea } = Input;
const menuUrl = baseUrl.portal.portal + "/formula/";
interface IProps {
    params: Array<string>;
    data: any;
    opts: Array<any>;
    name: string;
    steps: string;
    remark: string;
    materialName: string;
    preparateRate: string;
    details: Array<{materialName, preparateRate}>;
}

class Info extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            params: this.props.params[0],
            data: {},
            opts: [],
            name: "",
            steps: "",
            remark: "",
            materialName: "",
            preparateRate: "",
            details: []
        };
    }

    componentDidMount = () => {
        const infoUrl = `${menuUrl}` + this.state.params;
        axios.get(infoUrl).then(res => {
            const data = res.data;
            this.setState({ name: data.name, steps: data.stepts, remark: data.remark, details: data.details });
            debugger
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
                            名称: <Input value={this.state.name} />                        
                           
                            步骤: <TextArea value={this.state.steps} />
                            说明: <TextArea value={this.state.remark} />
                            <div style={{textAlign:"center"}}>配料配比设置<hr/></div>
                            {this.state.details !== null ? 
                                this.state.details.map(function(item) {
                                    return (
                                        <span>{item.materialName}{item.preparateRate}、</span>
                                    );
                                })
                            : ""}
                        </Form>
                    </div>
                </div>
            </div >
        )
    }
}

export default Info;