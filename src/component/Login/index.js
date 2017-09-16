import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { Row, Col, Tile, Button, Form, FormControl, Label, FormGroup } from 'tinper-bee';
import { Link } from 'react-router';

@inject('loginStore') @observer
class Login extends Component {

    changeUsername = (e) => {
        this.props.loginStore.changeUsername(e.target.value)
    }

    changePassword = (e) => {
        this.props.loginStore.changePassword(e.target.value)
    }

    render() {
        return (
            <Row className="login login-bg">
                <Col sm={3} smOffset={8}>
                    <Tile className="login-tile">
                        <h3 className="login-title">登录</h3>
                        <Form>
                            <FormGroup>
                                <Label>用户名</Label>
                                <FormControl
                                    onChange={ this.changeUsername }
                                    placeholder="请输入用户名"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>密码</Label>
                                <FormControl
                                    onChange={ this.changePassword }
                                    placeholder="请输入密码"
                                />
                            </FormGroup>
                            <Button
                                shape="squared"
                                colors="primary"
                                className="submit-btn">
                                登录
                            </Button>
                        </Form>
                    </Tile>
                </Col>
            </Row>
        );
    }
}
;

export default Login;