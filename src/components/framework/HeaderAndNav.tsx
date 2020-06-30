import React from 'react';
import NavBar from './NavBar';
import Head from './Head';
import {Layout} from 'antd';

class HeaderAndNav extends React.Component<any> {
    constructor(props: Readonly<any>) {
        super(props);
    }

    render() {
        return (
            // <div className="contaner">
            <Layout className="layout">
                <Head user={this.props.user} />
            </Layout>
               
            // </div>
        );
    }
}

export default HeaderAndNav;
