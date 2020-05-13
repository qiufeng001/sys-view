/**
 * Created by Yuicon on 2017/6/25.
 */
import '../../static/style/framework/NavBar.css';
import '../../static/style/pages/table.css';
import '../../../src/static/libs/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Tabs, Button, Pagination } from 'antd';
import 'antd/dist/antd.css';
import TabPaneComponent from './TabPaneComponent'

const { TabPane } = Tabs;
interface IProps {
    user: any;
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
            user: this.props.user,
            activeKey: panes[0].key,
            panes
        };

    }

    /*翻页事件*/
    onShowSizeChange(current, pageSize) {
        this.props.searchGroupManage({ page: current, size: pageSize });
    }

    /** 点击获取存在的当前页 */
    onChange = activeKey => {
        this.setState({ activeKey });

    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    handleClickMenu = (event) => {
        var target = event.target;
        // 组件所在路径
        var modul = target.name;
        var id = target.id;
        var tabId = "tab_" + (id).substr(4, id.length);
        var textContent = target.textContent;
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
            <body>
                <div className="navbar navbar-expand flex-column flex-md-row headerMain">
                    <div className="menu-main">
                        <ul className="navbar-nav" id="menuTree">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">基础管理系统</a>
                                <ul className="dropdown-menu" aria-labelledby="bd-versions">
                                    <button className="dropdown-item" name="/portal/Menu" id="menu_2" onClick={this.handleClickMenu}>菜单管理</button>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="login-user-main">欢迎：{this.state.user}</div>
                </div>
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
            </body>
        )
    }
}

export default NavBar;