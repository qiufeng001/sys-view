import * as React from 'react';
import { Form, Input} from 'antd';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';

const FormItem = Form.Item;

type LoginProps = {setAlitaState: (param: any) => void; auth: any; } & RouteComponentProps & FormProps;
class Login extends React.Component<LoginProps> {
    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    render() {
        const getFieldDecorator  = this.props.form!;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>React Admin</span>
                    </div>
                    <Input placeholder="管理员输入admin, 游客输入guest" />
                     <Input type="password" placeholder="管理员输入admin, 游客输入guest"  />
                       
                </div>
            </div>
        );
    }
}

export default Login;
