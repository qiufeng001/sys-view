import React from 'react';
import { FormGroup, FormControl, FormLabel, ButtonGroup, Button, FormCheck } from 'react-bootstrap';
import {infoDetail} from '../../../../static/framework/common';
import baseUrl from "../../../../api/baseUrl";
const menuUrl = baseUrl.portal.portal + "/menu/";
interface IProps {
    params:  Array<string>;
    data: any;
    pIdSelect: string;
    statusRadio: boolean;
    code: string;
    name: string;
    status: number;
    sequence: number;
    url: "";
}

class Info extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            params: this.props.params,
            data: {},
            pIdSelect: "",
            statusRadio:true,
            code: "",
            name: "",
            status: 1,
            sequence: 1,
            url: ""
        };
    }

    componentDidMount = () => {
        infoDetail(menuUrl, this);
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
                    <form>
                        <FormGroup>
                            <FormLabel>编码：</FormLabel>
                            <FormControl type="text"
                                value={this.state.code} readOnly />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>菜单名：</FormLabel>
                            <FormControl type="text"
                                value={this.state.name} readOnly />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>排序：</FormLabel>
                            <FormControl type="text"
                                value={this.state.sequence} readOnly/>
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>状态：</FormLabel>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="enableCheck" value="1" checked={this.state.statusRadio} readOnly/>
                                <label className="form-check-label" htmlFor="enableCheck">
                                    激活
                                </label>
                            </div>&nbsp;&nbsp;&nbsp;
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="disableCheck" value="0" checked={!(this.state.statusRadio)} readOnly/>
                                <label className="form-check-label" htmlFor="disableCheck">
                                    冻结
                                </label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>路&nbsp;&nbsp;&nbsp;&nbsp;径：</FormLabel>
                            <FormControl type="text" value={this.state.url}
                                placeholder="请输入url" />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>路&nbsp;&nbsp;&nbsp;&nbsp;径：</FormLabel>
                            <FormControl
                                id="tarifications_dropdown"
                                placeholder="select"
                                as="select" readOnly>
                                {this.state.pIdSelect}
                            </FormControl>
                        </FormGroup>                       
                        <br />
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default Info;