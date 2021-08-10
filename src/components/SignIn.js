import React from 'react';
import {Link} from 'react-router-dom'

import {Form, Input, Button, message} from "antd";
import {BASE_URL} from '../constants/constants';
import axios from 'axios'



function SignIn(props) {

    const {signedInSuccess}=props;

    const onFinish = values => {

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
                if (res.status == 200) {
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





    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!"
                    }
                ]}
            >
                <Input
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
            >
                <Input
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Sign in
                </Button>
                New user? <Link to= "/signUp" > Sign up now.</Link>
            </Form.Item>
        </Form>




    );




}

export default SignIn;