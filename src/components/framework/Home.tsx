/**
 * Created by Yuicon on 2017/6/25.
 */
import React from 'react';
import { Input, Menu} from "element-react";
class Header extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            searchInput: 'searchInput',
            name : "niuniu"
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    
    handleSelect = (index: any) => {
        alert(index)
        console.log("handleSelect");
    };

    handleIconClick = () => {
        console.log('handleIconClick');
    };

    render() {
        return (
        <header className="main-header visible">
            <div className="container">
            <a href="/" className="logo">
                <img src="//gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金" className="logo-img"/>
            </a>
            <div className="nav-menu">
                <Menu defaultActive="1" mode="horizontal" onSelect={this.handleSelect}>
                <Menu.Item index="1">首页</Menu.Item>
                <Menu.Item index="2">专栏</Menu.Item>
                <Menu.Item index="3">收藏集</Menu.Item>
                <Menu.Item index="4">发现</Menu.Item>
                <Menu.Item index="5">标签</Menu.Item>
                <Menu.Item index="6">
                    <Input
                        size="small"
                        icon="search"
                     
                        placeholder="搜索掘金"
                        onIconClick={this.handleIconClick}
                        onChange={(value) => this.setState({searchInput: value})}
                    />
                </Menu.Item>
                <Menu.Item index="7">
                    <button className="contribute">投稿</button>
                </Menu.Item>
                <Menu.Item index="8">
                    <button className="login-btn"
                            onClick={ () => console.log('登录') }>登录</button>
                    <button onClick={ () => console.log('注册') }>注册</button>
                </Menu.Item>
                </Menu>
            </div>
            </div>
        </header>
        )
    }
}

export default Header;