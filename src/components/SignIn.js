import React from 'react';
import {Link} from 'react-router-dom'

import {Form, Input, Button, message} from "antd";
import {BASE_URL} from '../constants/constants';
import axios from 'axios'
import { SIGN_UP_PATH } from '../constants/paths';


function SignInForm(props) {

    const {signedInSuccess} = props;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {email, password} = values;

                const opt = {
                    method: "post",
                    url: `${BASE_URL}/signin`,
                    data: {
                        email: email,
                        password: password
                    },

                    headers: {'content-type': 'application/json'}


                };

                axios(opt).then(
                    res => {
                        if (res.status === 200) {
                            message.success('Sign in succeed!');
                            signedInSuccess(res.data);
                        }
                    }
                ).catch(
                    err => {
                        console.log('sign in failed: ', err.message);
                        message.error('Sign in failed!');

                    }
                )
            }
        });
    };

    const {getFieldDecorator} = props.form;
    return (
        <div className="signin">
            <h2 className="signin-title">Sign In</h2>
            <Form name="normal_login" className="login-form" onSubmit={handleSubmit}>
                <Form.Item
                    label="Email"
                    labelAlign="left"
                >
                     {getFieldDecorator('email', {
                        rules: [

                            {
                                required: true,
                                message: 'Please input your Email!'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item
                    label="Password"
                    labelAlign="left"
                >
                    {getFieldDecorator('password', {
                        rules: [

                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]
                    })(<Input/>)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign in
                    </Button>
                    New user? <Link to={SIGN_UP_PATH}> Sign up now.</Link>
                </Form.Item>
            </Form>
        </div>
    );


}

const SignIn = Form.create()(SignInForm);

export default SignIn;