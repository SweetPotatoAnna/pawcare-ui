import React from 'react';
import {Form, Input, Button, message} from 'antd';
import axios from 'axios';
import {BASE_URL} from '../constants/constants';


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};


function SignUp(props) {

    const [form] = Form.useForm();


    const onFinish = values => {

        const {firstname, lastname, email, password} = values;

        const opt = {
            method: "post",
            url: `${BASE_URL}/signup`,
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            },

            headers: {'content-type': 'application/json'}


        };

        axios(opt).then(
            res => {
                if (res.status == 200) {
                    message.success('Sign up succeed!');
                    props.history.push('/signIn');
                }
            }
        ).catch(
            err => {
                console.log('sign up failed: ', err.message);
                message.error('Sign up failed!');

            }
        )

    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="signup"
        >
            <Form.Item
                name="firstname"
                label="First name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="lastname"
                label="Last name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>




            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    }
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!'
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        }
                    })
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="signup-btn">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>


    );
}

export default SignUp;