import * as React from 'react';
import axios from 'axios';
import indexUrl from "../../api/portal";
import cookie from 'react-cookies'
const url = indexUrl.index;

interface IProps {
    ticket: string
}    

class Index extends React.Component<Index, IProps> {
    constructor(props: Readonly<Index>) {
        super(props);
        this.state =  { ticket: cookie.load('ticket') }
    }

    componentDidMount = () => {
        debugger
        const ticket = this.state.ticket;
        if(ticket == null || ticket == '' || ticket == undefined) {
            window.location.href = `${url}`;
        }
        axios.post(`${url}`).then(res => {
            debugger
        }).catch(err => {
            debugger
            const location = window.location;
            const searh = location.search;
            // window.location.href = location.origin + location.pathname + searh;
            if(searh.indexOf('ticket') != -1) {
                const ticketArr = searh.split('ticket=');
                const ticket = ticketArr[1];
                cookie.save('ticket', ticket);
                this.setState({ticket: ticket})
            }
            // window.location.href = location.origin + location.pathname + searh;
        });
        // axios.post(`${url}?name=333`).then((res)=>{
      
        // }).catch(err => {

        // });
    }

    render() {
        return (
            <div onLoad={this.componentDidMount}></div>
        );
    }
}

export default Index;
