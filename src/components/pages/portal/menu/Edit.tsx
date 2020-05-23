import React from 'react';

import '../../../../static/style/framework/Edit.css';
interface IProps {
    params:  Array<string>
}

class Edit extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            params: this.props.params
        };
    }

    componentDidMount = () => {
        
    }

    backExecute = () => {
        this.props.backExecute(this.props.params);
    }


    render() {
        return (
            <div className="bs-table-main">
                <div className="formHeader">
                    <div className="titleDiv">菜单修改</div>
                    <div className="backDiv">
                        <button  onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                </div>
            </div>
          
        )
    }
}

export default Edit;