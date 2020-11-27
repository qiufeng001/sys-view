import * as React from 'react';
import axios from 'axios';
import portalUrl from "../../api/portal";
import baseUrl from "../../api/baseUrl";
import HeaderAndNav from './HeaderAndNav';

const loginUser = portalUrl.loginUser;

interface IProps {
    initBar: any;
    ticket: string;
    isAuth: boolean;
}

class Index extends React.Component<Index, IProps> {
    match: any
    constructor(props: Readonly<Index>) {
        super(props);
        this.state = {
            initBar: AnalyserNode,
            ticket: document.cookie,
            isAuth: false
        }
    }

    componentDidMount = () => {
        var loginUrl = `${loginUser}`;
        axios.post(loginUrl).then(res => {
            const code = res.data.code;
            if(code ==  1001) {
                window.location.href =baseUrl.cas.login + "?service=http://localhost/portal/cas/redirectToReact";
            }else{
                this.handleInit(res.data.user);
            }
        }).catch(err => {
            alert("系统出错！请联系管理员！");
        });
    }

    handleInit = (user) => {
        this.setState({initBar: <HeaderAndNav user={user} />});
    }

    render() {
        return (
            <div className="contaner">
                {this.state.initBar}
                {/* <HeaderAndNav /> */}
            </div>
        );
    }
}

export default Index;
