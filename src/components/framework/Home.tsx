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
                首页
            </div>
        </header>
        )
    }
}

export default Header;