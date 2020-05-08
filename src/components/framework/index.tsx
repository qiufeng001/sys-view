import * as React from 'react';
import axios from 'axios';
import indexUrl from "../../api/portal";
import baseConfig from "../../api/baseconfig";
import Header from './Header';
import NavBar    from './NavBar';
import "jquery";
const isLogin = indexUrl.isLogin;
const index = indexUrl.index;

interface IProps {
    ticket: string,
    isAuth: boolean
}    

class Index extends React.Component<Index, IProps> {
    constructor(props: Readonly<Index>) {
        super(props);
        this.state =  { 
            ticket: document.cookie,
            isAuth: false
        }
    }

    // componentDidMount = () => {
    //     const requestUrl = document.URL;
    //     const ticket = this.state.ticket;
    //     if(ticket != null && ticket != undefined && ticket != '') {
    //         axios.post(`${index}`).then(res => {
                
    //         }).catch(err => {
    //             alert("系统出错！请联系管理员！")
    //         });
    //     }else {
    //         if(requestUrl.indexOf('ticket=') != -1) {
    //             axios.post(`${isLogin}`).then(res => {
    //                 alert(res.data.cas_ticket);
    //                 cookie.set("cas_ticket", res.data.cas_ticket);
    //                 window.location.href = 'http://localhost';
    //             }).catch(err => {
    //                 alert("系统出错！请联系管理员！")
    //             });
    //         }else if(requestUrl.indexOf('service=') != -1) {
    //             const url = requestUrl.split("?");
    //             window.location.href = url[0] + '?service=http://localhost';
    //         }else{
    //             axios.post(`${isLogin}`).then(res => {
    //                 const responseURL = res.request.responseURL;
    //                 if(responseURL.indexOf('service=') != -1) {
    //                     const url = responseURL.split("?");
    //                     window.location.href = url[0] + '?service=http://localhost/portal/cas/rediectToReact';
    //                 }else{
    //                     axios.post(`${isLogin}`).then(res => {
    //                         debugger
    //                         document.cookie = res.data.cas_ticket;
    //                         window.location.href = 'http://localhost';
    //                     }).catch(err => {
    //                         alert("系统出错！请联系管理员！")
    //                     });
    //                 }
    //             }).catch(err => {
    //                 alert("系统出错！请联系管理员！")
    //             });
    //         }
    //     }
    // }
    render() {

        const header = <Header></Header>
        const navBar = <NavBar></NavBar>
        return (
        <div className="contaner">
            {header}{navBar}
        </div>
        );
    }
}

export default Index;
