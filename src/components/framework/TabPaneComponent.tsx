import React from 'react';
import AsyncComponent from './AsyncComponent';
interface IProps {
  url: string;
}

class TabPaneComponent extends React.Component<any, IProps> {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.modul == null || this.props.modul == undefined 
          ? '/framework/NotFound' : '/pages' + this.props.modul,
    };
  }

  render() {
    const TabComponent = AsyncComponent(() => import('../../components' + this.state.url));
    return (
      <TabComponent />
    )
  }
}

export default TabPaneComponent;