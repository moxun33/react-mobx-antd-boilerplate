import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, message, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('loginStore')
@observer
@withRouter
class HorizontalLoginForm extends React.Component {
  changeUsername = e => {
    this.props.loginStore.changeUsername(e.target.value);
  };

  changePassword = e => {
    this.props.loginStore.changePassword(e.target.value);
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginStore.loginSubmit(values, () => {
          //callback
          message.success('登录成功');

          this.props.history.push('/');
        });
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <FormItem validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ fontSize: 13 }} />}
              placeholder='Username'
              onBlur={this.changeUsername.bind(this)}
            />
          )}
        </FormItem>
        <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
              type='password'
              placeholder='Password'
              onBlur={this.changePassword.bind(this)}
            />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(HorizontalLoginForm);
export default Login;
