import React from 'react';
import List from './List';
import Edit from './Edit';
import Info from './Info';

interface IProps {
    panelContentType: string;
    params: [];
}

class Index extends React.Component<any, IProps> {
    
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            panelContentType: "list",
            params: []
        };
        this.execute = this.execute.bind(this);
        this.backExecute = this.backExecute.bind(this);
    }

      /** 新增/修改 */
      addOrEdit = (type, params) => {
        // 先重置面版类型
        this.updateContentType(type, params);
    }
    
    /** 删除 */
    delete = (type, params) => {

        
    }
    
    /** 查看 */
    info = (type, params) => {
        
    }
    
    /** 导出 */
    export = (type, params) =>{
        
    }

    /** 方法执行 */
    execute = (type, params) => {
        switch(type) {
            case 'add':
                this.addOrEdit(type, params);
                break;
            case 'delete':
                this.delete(type, params);
                break;
            case 'edit':
                this.addOrEdit(type, params);
                break;
            case 'info':
                this.info(type, params);
                break;
            case 'export':
                this.export(type, params);
                break;
        }
    }
  
    updateContentType = (type, params) => {
        this.setState({panelContentType : type,  params: params})
    }

    backExecute = (params) => {
        this.setState({panelContentType : 'list',  params: params})
    }

    render() {
        const panelContentType = this.state.panelContentType;
        if(panelContentType == 'list') {
            return (
                <List execute={this.execute} />
            )
        }else if(panelContentType == 'edit' || panelContentType == 'add') {
            return (
                <Edit params={this.state.params} backExecute={this.backExecute} />
            )
        }else {
            return (
                <Info  params={this.state.params} backExecute={this.backExecute} />
            )
        }
        
    }
}

export default Index;