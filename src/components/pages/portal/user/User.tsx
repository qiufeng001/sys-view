import React from 'react';

interface IProps {
    searchInput: string;
    name: string
  }
class User extends React.Component<any, IProps> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            searchInput: 'searchInput',
            name : "niuniu"
        };
    }
 
    render() {
        return (
            <div></div>
        )
    }
}

export default User;