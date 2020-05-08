import React from 'react';
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

interface IProps {
    menus: any;
  }
class Menu extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            menus: []
        };
    }

    componentDidMount = () => {
        var menus = [{
            id: 1, name: "test" 
        },{
            id: 2, name: "test" 
        },{
            id: 3, name: "test" 
        },{
            id: 4, name: "test" 
        }]
        this.setState({menus: menus});
    }
 
    render() {
        return (
            <BootstrapTable data={this.state.menus} striped menu>
                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default Menu;