/**
 * Created by Yuicon on 2017/6/25.
 */
import '../../static/style/framework/NavBar.css';
import '../../../src/static/libs/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import { Tabs, Button, Table, Pagination } from 'antd';
import Icon from 'antd/lib/icon';
import 'antd/dist/antd.css';
import AsyncComponent from './AsyncComponent.js';
import TabPaneComponent from './TabPaneComponent'
import { Menu, Dropdown } from 'antd';
import DownOutlined from 'antd/es/icon';

const { TabPane } = Tabs;
interface IProps {
    activeKey: string;
    panes: any;
}

class ToTabContent extends React.Component<any, ToTabContent>{
    constructor(props) {
        super(props)
    }
    render() {
        //通过传入的name属性动态得到自己需要注入的组件，MyComponent首字母要大写
        const MyComponent = Pagination[this.props.name]

        return <MyComponent {...this.props} />
    }
}

class NavBar extends React.Component<any, IProps> {
    tabIndex: number;

    constructor(props: Readonly<{}>) {
        super(props);
        this.tabIndex = 1;
        const panes = [
            { title: '首页', key: '0', id: 'tab' },
        ];

        this.state = {
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
        debugger

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
            // return <AsyncComponent component={import("./Login")} />;
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


                <div className="navbar navbar-expand flex-column flex-md-row">
                    <ul className="navbar-nav" id="menuTree">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">v4.4  </a>
                            <ul className="dropdown-menu" aria-labelledby="bd-versions">
                                <button className="dropdown-item" name="/portal/Menu" id="menu_1" onClick={this.handleClickMenu}>百度</button>
                                <button className="dropdown-item" name="www.baidu.com" id="menu_2" onClick={this.handleClickMenu}>v3 版本</button>
                                <a className="dropdown-item" href="#" id="menu_3" onClick={this.handleClickMenu}>v2 版本</a>
                                <a className="dropdown-item" href="#" id="menu_4" onClick={this.handleClickMenu}>所有版本</a>
                            </ul>
                        </li>
                    </ul>
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
                                <TabPaneComponent modul={pane.modul}></TabPaneComponent>
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </body>
        )
    }
}

export default NavBar;