import React, {Component} from 'react';
import {Form, Button, Input, message} from 'antd';
import axios from 'axios';
import {BASE_URL} from '../constants/constants';
import {Link} from 'react-router-dom'


class SignUpForm extends Component {


    state = {
        confirmDirty: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
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
                        if (res.status === 200) {
                            message.success('Sign up succeed!');
                            this.props.history.push('/signIn');
                        }
                    }
                ).catch(
                    err => {
                        console.log('sign up failed: ', err.message);
                        message.error('Sign up failed!');

                    }
                )
            }
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 24}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24}
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 24,
                    offset: 0
                }
            }
        };


        const {getFieldDecorator} = this.props.form;

        return (


            <div className="signup">
                <p className="signup-title">
                    Sign Up
                </p>
                <Form {...formItemLayout}
                      onSubmit={this.handleSubmit}
                      className="signup-form"
                >

                    <Form.Item label="First name"
                               labelAlign="left"
                    >
                        {getFieldDecorator('firstname', {
                            rules: [

                                {
                                    required: true,
                                    message: 'Please input your first name!'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="Last name"
                               labelAlign="left"
                    >
                        {getFieldDecorator('lastname', {
                            rules: [

                                {
                                    required: true,
                                    message: 'Please input your last name!'
                                }
                            ]
                        })(<Input/>)}
                    </Form.Item>


                    <Form.Item label="Email"
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

                    <Form.Item label="Password"
                               hasFeedback
                               labelAlign="left"
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },
                                {
                                    validator: this.validateToNextPassword
                                }
                            ]
                        })(<Input.Password/>)}
                    </Form.Item>

                    <Form.Item label="Confirm Password"
                               hasFeedback
                               labelAlign="left"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!'
                                },
                                {
                                    validator: this.compareToFirstPassword
                                }
                            ]
                        })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="signup-btn">
                            Sign Up
                        </Button>
                        Already have an account? <Link to="/signIn"> Sign in now.</Link>

                    </Form.Item>

                </Form>


            </div>


        );
    }
}


const SignUp = Form.create()(SignUpForm);

export default SignUp;