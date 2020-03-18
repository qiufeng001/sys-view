import * as React from 'react';
import axios from 'axios';
import indexUrl from "../../api/portal";
const url = indexUrl.index;

class Index extends React.Component<Index> {
    constructor(props: Readonly<Index>) {
        super(props);
    }

    componentDidMount = () => {
        axios.post(`${url}?name=333`).then((res)=>{
            debugger
            console.log("返回的结果为：" + res.data);
            return res.data;
        });
    }

    render() {
        return (
            <body onLoad={this.componentDidMount}></body>
        );
    }
}

export default Index;
