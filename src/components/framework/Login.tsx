import * as React from 'react';
import { Form, Input, Button, Checkbox} from 'antd';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';
import axios from 'axios';
import baseconfig from "../../api/baseconfig";
import '../../static/style/login.less';
const base = baseconfig.Config.portalUrl;
interface IProps {
    name: string,
    username: string,
    password: string,
    checkboxs: Array<any>
}


type LoginProps = {setAlitaState: (param: any) => void; auth: any; } & RouteComponentProps & FormProps;

class Login extends React.Component<LoginProps, IProps> {
    constructor(props: Readonly<LoginProps>) {
        super(props);
        this.state = {
            name: "用户登录",
            username: "",
            password: "",
            checkboxs:[]
        }
    }

    query = {
        username:{
            value:'',
            validata:[
                {
                    errMessage:'用户名必须填写',
                    test:(value) => {
                        return value;
                    }
                }
            ]
        },
        password:{
            value:'',
            validata:[
                {
                    errMessage:'密码必须填写',
                    test:(value) => {
                        return value;
                    }
                },
                {
                    errMessage:'密码长度最为6',
                    test:(value) => {
                        return value.length === 6;
                    }
                }
            ]
        }
    }

    handleChange =(name,event) => {
        var newState = {};
        // console.log(name,event.target);
        // event.target.checked?newState[name] = event.target.checked:newState[name] = event.target.value;
       newState[name] = event.target.value;
        // console.log(newState);
        this.setState(newState);
        for(let key in this.query){
            if(key === name){
                this.query[key].value = event.target.value;
            }
        }
    };

    // 提交表单
    handleSubmit = (e: React.FormEvent) => {
        console.log(this.state);
        const params = this.state;
        axios.post(`${base}/user/userInfo?username=` + params.username, params,{
            headers:{
                
            }
        }).then((res)=>{
            debugger
            console.log("返回的结果为：" + res.data);
            return res.data;
        });
    };

    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                    <span>{this.state.name}</span>
                    </div>
                    <Form onSubmitCapture={this.handleSubmit}>
                            <Input
                                placeholder="用户名..." 
                                value={this.state.username} onChange={this.handleChange.bind(this,'username')}
                            />
                            <Input
                                type="password"
                                placeholder="密码..."
                                value={this.state.password} onChange={this.handleChange.bind(this,'password')}
                            />
                           <Checkbox onChange={this.handleChange.bind(this,'checkboxs')}>记住我</Checkbox>
                            <span className="login-form-forgot" style={{ float: 'right' }}>
                                忘记密码
                            </span>
                            <Button
                                type="primary"
                                // htmlType="submit"
                                className="login-form-button"
                                style={{ width: '100%' }}
                                onClick={this.handleSubmit}
                            >
                                登录
                            </Button>                    
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
