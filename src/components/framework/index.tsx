import * as React from 'react';
import axios from 'axios';
import portalUrl from "../../api/portal";
import baseUrl from "../../api/baseUrl";
import NavBar from './NavBar';

const loginUser = portalUrl.loginUser;

interface IProps {
    initBar: any;
    user: any;
    ticket: string;
    isAuth: boolean;
}

class Index extends React.Component<Index, IProps> {
    match: any
    constructor(props: Readonly<Index>) {
        super(props);
        this.state = {
            initBar: AnalyserNode,
            user: [],
            ticket: document.cookie,
            isAuth: false
        }
    }

    componentDidMount = () => {
        axios.post(`${loginUser}`).then(res => {
            const code = res.data.msg;
            if(code ==  1001) {
                window.location.href =baseUrl.cas.login + "?service=" + baseUrl.portal.redirectToReact;
            }else{
                this.handleInit(code);
            }
            
        }).catch(err => {
            alert("系统出错！请联系管理员！")
        });
    }

    handleInit = (user) => {
        this.setState({user: user});
        this.setState({initBar: <NavBar user={user} />});
    }

    render() {
        return (
            <div className="contaner">
                {this.state.initBar}
            </div>
        );
    }
}

export default Index;
