import React from 'react';
import '../../../src/static/style/framework/Header.css';
import { Layout, Menu, Dropdown, Tabs, Breadcrumb } from 'antd';
import baseUrl from "../../api/baseUrl";
import axios from 'axios';
import TabPaneComponent from './TabPaneComponent'
import 'antd/dist/antd.css';
const logoutUrl = baseUrl.portal.logout;
const { Header, Content } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;


interface IProps {
    menus: Array<any>;
}

/**
 *  菜单项加载
 */
class MenuItem extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            menus: this.props.menuItems
        }
    }

    componentDidMount = () => {

    }


    accountDetail = () => {

    }

    uploadImg = () => {

    }


    handleLogout = () => {
        window.location.href = logoutUrl;
    }



    render() {
        const baseInfo = (
            <Menu>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => this.uploadImg()}> 上传头像</a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => this.accountDetail()}> 个人信息</a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => this.handleLogout()}> 退出</a>
                </Menu.Item>
            </Menu>);

        const handleClickMenu = (event) => {
            this.props.handleClickMenu(event);
        }

        return (
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
               {
                    this.state.menus.map(function (item) {
                        return (<SubMenu key={item.id}
                            title={item.name}>
                                {item.childMenus != null ? 
                                    item.childMenus.map((secItem) => (
                                        <Menu.Item key={item.childMenus.indexOf(secItem)} title={secItem.url} onClick={handleClickMenu}>{secItem.name}</Menu.Item>
                                    )) : ''
                                }
                                
                        </SubMenu>)
                    })
                }
                <Dropdown overlay={baseInfo} className="base-info">
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        基本信息
                    </a>
                </Dropdown>
            </Menu>
        )
    }
}

export default MenuItem;