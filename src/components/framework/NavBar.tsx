/**
 * Created by Yuicon on 2017/6/25.
 */
import '../../static/style/framework/NavBar.css';
import '../../static/style/pages/table.css';
import React from 'react';
import { Layout, Tabs, Menu, Breadcrumb} from 'antd';
import TabPaneComponent from './TabPaneComponent'
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const { Content } = Layout;
const { TabPane } = Tabs;
interface IProps {
    activeKey: string;
    panes: any;
}

class NavBar extends React.Component<any, IProps> {
    tabIndex: number;

    constructor(props: Readonly<{}>) {
        super(props);
        this.tabIndex = 1;
        const panes = [
            { title: '首页', key: '0', id: 'menu_1' }
        ];

        this.state = {

            activeKey: panes[0].key,
            panes
        };

    }

    /** 点击获取存在的当前页 */
    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    handleClickMenu = (event) => {
        debugger
        var node = event.item.node;
        // 组件所在路径
        var modul = node.title;
        var id = node.id;
        var tabId = "tab_" + (id).substr(4, id.length);
        var textContent = node.textContent;
        var { panes } = this.state;
        var flag = false;
        panes.forEach((item) => {
            var exitsTabId = item.id;
            if (tabId == exitsTabId) {
                flag = true;
            }
        });
        if (!flag) {
            var activeKey = `${this.tabIndex++}`;
            panes.push({ title: textContent, key: activeKey, id: tabId, modul: modul });
            this.setState({ panes, activeKey });
        }
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    render() {
        return (
            <header>
                {/* <div className="navbar navbar-expand flex-column flex-md-row" id="navbarheaderMain">
                    <div className="menu-main">
                        <ul className="navbar-nav" id="menuTree">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">基础管理系统</a>
                                <ul className="dropdown-menu" aria-labelledby="bd-versions">
                                    <button className="dropdown-item" name="/portal/menu" id="menu_2" onClick={this.handleClickMenu}>菜单管理</button>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">基础管理系统</a>
                                <ul className="dropdown-menu" aria-labelledby="bd-versions">
                                    <button className="dropdown-item" name="/portal/menu" id="menu_2" onClick={this.handleClickMenu}>菜单管理</button>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div> */}
                <Menu mode="horizontal">
                    <SubMenu title=" 基础管理系统">
                        <SubMenu title="系統管理">
                            <Menu.Item key="1" title="/portal/menu" id="menu_2" onClick={this.handleClickMenu}>菜单管理</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
                <div className="pannal">
                    <Tabs
                        hideAdd
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key}>
                                <TabPaneComponent modul={pane.modul} id={pane.id}></TabPaneComponent>
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </header>
        )
    }
}

export default NavBar;