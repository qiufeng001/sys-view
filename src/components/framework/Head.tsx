import React from 'react';
import '../../../src/static/style/framework/Header.css';
import { Layout, Tabs } from 'antd';
import MenuItem from './MenuItem';
import baseUrl from "../../api/baseUrl";
import axios from 'axios';
import TabPaneComponent from './TabPaneComponent'
import 'antd/dist/antd.css';
const { Header } = Layout;
const { TabPane } = Tabs;

interface IProps {
    menuItem: any;
    user: string;
    panes: any;
    activeKey: string;
}


class Head extends React.Component<any, IProps> {
    tabIndex: number;
    constructor(props: Readonly<{}>) {
        super(props);
        this.tabIndex = 1;
        const panes = [
            { title: '首页', key: '0', menuKey: '0'}
        ];
        this.state = {
            user: this.props.user,
            activeKey: panes[0].key,
            menuItem: AnalyserNode,
            panes
        }
        this.handleClickMenu = this.handleClickMenu.bind(this);
    }

    componentDidMount = () => {
        const url = baseUrl.portal.portal + "/menu/menus"
        axios.post(url).then(res => {
            const menuItems = res.data;
            const menuItem = <MenuItem menuItems={menuItems} handleClickMenu={this.handleClickMenu} />
            this.setState({ menuItem: menuItem });
        }).catch(err => {
            alert("系统出错！请联系管理员！");
        });
    }

   

    /** 点击获取存在的当前页 */
    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    handleClickMenu = (event) => {
        var node = event.item.node;
        // 组件所在路径
        var modul = node.title;
        var key = event.key;
        var textContent = node.innerText;
        var { panes } = this.state;
        var flag = false;
        panes.forEach((item) => {
            debugger
            var exitsKey = item.menuKey;
            if (key == exitsKey) {
                flag = true;
            }
        });
        if (!flag) {
            var activeKey = `${this.tabIndex++}`;
            panes.push({ title: textContent, key: activeKey, menuKey: key, modul: modul });
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
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    {this.state.menuItem}
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
                </Header>
            </Layout>
        )
    }
}

export default Head;