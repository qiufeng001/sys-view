import * as React from 'react';
import axios from 'axios';
import portalUrl from "../../api/portal";
import NavBar from './NavBar';


const isLogin = portalUrl.isLogin;
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
            const msg = res.data.msg;
            if(msg ==  1001) {
                // 115.28.106.80
                window.location.href = 'http://115.28.106.80/cas/login?service=http://115.28.106.80/portal/cas/rediectToReact';
            }else{
                this.handleInit(msg);
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
                {/* <NavBar /> */}
            </div>
        );
    }
}

export default Index;
