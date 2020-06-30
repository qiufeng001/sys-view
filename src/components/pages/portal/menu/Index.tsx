import React from 'react';
import List from './List';
import Edit from './Edit';
import Info from './Info';

interface IProps {
    status: string;
    panelContentType: string;
    params: [];
}

class Index extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            status: "",
            panelContentType: "list",
            params: []
        };
        this.updateContentType = this.updateContentType.bind(this);
        this.backExecute = this.backExecute.bind(this);
        this.resFun = this.resFun.bind(this);
    }

    updateContentType = (type, params) => {
        this.setState({ panelContentType: type, params: params })
    }

    /**回退 */
    backExecute = (params, state) => {
        this.setState({ panelContentType: 'list', params: params });
    }

    /**新增或者修改，成功或者失败后调用 */
    resFun = (status) => {
        this.setState({ status: status, panelContentType: "list" });
    }

    render() {
        const panelContentType = this.state.panelContentType;
        if (panelContentType == 'list') {
            return (
                <List updateContentType={this.updateContentType} state={this.state.status} />
            )
        } else if (panelContentType == 'edit' || panelContentType == 'add') {
            return (
                <Edit params={this.state.params} backExecute={this.backExecute} resFun={this.resFun} />
            )
        } else {
            return (
                <Info params={this.state.params} updateContentType={this.updateContentType} backExecute={this.backExecute} />
            )
        }

    }
}

export default Index;