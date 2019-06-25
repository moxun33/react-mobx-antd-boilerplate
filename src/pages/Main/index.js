/**
 * created by   moxingxum on 2018-07-08 22:06
 *
 **/

import React, { Component, PropTypes } from 'react';
import getRouter from 'router/router';
import Nav from 'components/Nav/Nav';
import { Layout, Breadcrumb } from 'antd';
import './style.less';

const { Header, Content, Footer } = Layout;
export default class index extends Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Nav />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{getRouter()}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
        </Layout>
      </div>
    );
  }
}
