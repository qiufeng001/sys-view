import React from 'react';
import AsyncComponent from '../../static/framework/asyn-component';
interface IProps {
  url: string;
  tabId: string;
}

class TabPaneComponent extends React.Component<any, IProps> {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.modul == null || this.props.modul == undefined 
          ? '/framework/Home' : '/pages' + this.props.modul + "/Index",
          tabId: this.props.id
    };
  }

  render() {
    const TabComponent = AsyncComponent(() => import('../../components' + this.state.url));
    return (
      <TabComponent tabId={this.state.tabId}/>
    )
  }
}

export default TabPaneComponent;