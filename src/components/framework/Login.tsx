import * as React from 'react';
import baseConfig from "../../api/baseConfig";
const baseUrl = baseConfig.Config.baseUrl;

class Login extends React.Component<Login> {
    constructor(props: Readonly<Login>) {
        super(props);
    }

    componentDidMount = () => {
        window.location.href =baseUrl.cas.login + "?service=" + baseUrl.portal.redirectToReact;
    }

    render() {
        return (
            <div className="login">
                
            </div>
        );
    }
}

export default Login;
