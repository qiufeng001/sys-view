/**
 * Created by Yuicon on 2017/6/25.
 */

import React from 'react';

interface IProps {

}

class Header extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
    }

    login = (val) => {

    }

    register = (val) => {

    }

    render() {
        return (
            <header className="navbar navbar-expand flex-column flex-md-row bd-navbar headerMain" >
                <div className="navbar-nav-scroll">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link " href="/">首页</a>
                        </li>
                        <li id="markImg">
                            <img height="40px;" width="120px;" src={require('../../static/imgs/mark.jpg')} />
                        </li>
                           
                    </ul>
                    
                </div>
                <ul className="navbar-nav ml-md-auto">
                                <li><a className="nav-item nav-link loginLink" type="button" onClick={() => this.login("login")}>登录</a></li>
                                <li><a className="nav-item nav-link registerLink" type="button" onClick={() => this.register("register")}>注册</a></li>
                            </ul>
            </header>
            
        )
    }
}

export default Header;