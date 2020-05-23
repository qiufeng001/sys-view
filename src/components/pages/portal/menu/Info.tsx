import React from 'react';

interface IProps {
    params:  Array<string>
}

class Info extends React.Component<any, IProps> {
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
                    <div className="titleDiv">查看</div>
                    <div className="backDiv">
                        <button  onClick={this.backExecute}>返回</button>
                    </div>
                    <hr />
                </div>
            </div>
          
        )
    }
}

export default Info;