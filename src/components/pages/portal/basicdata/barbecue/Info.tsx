import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import baseUrl from "../../../../../api/baseUrl";
const { TextArea } = Input;
const menuUrl = baseUrl.portal.portal + "/barbecue/";
interface IProps {
    params: Array<string>;
    data: any;
}

class Info extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            params: this.props.params[0],
            data: {}
        };
    }

    componentDidMount = () => {
        const infoUrl = `${menuUrl}` + this.state.params;
        axios.get(infoUrl).then(res => {
            const data = res.data;
            this.setState({ data: data });
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
                    <div className="titleDiv">烧烤材料明细</div>
                    <div className="backDiv">
                        <button onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                    <div className="editForm">
                        名称: <Input value={this.state.data.name} />
                        方法: <TextArea value={this.state.data.method} style={{ height: 80 }} />
                        配料: <TextArea value={this.state.data.ingredients} style={{ height: 150 }} />
                        标签: <TextArea value={this.state.data.tag} style={{ height: 150 }} />
                        说明: <TextArea value={this.state.data.remark} style={{ height: 80 }} />
                    </div>
                </div>
            </div >
        )
    }
}

export default Info;