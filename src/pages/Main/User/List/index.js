import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import './style.less';
import {Link,  withRouter } from 'react-router-dom';
const data = [
  {
    name: '用户1',
    id: 1
  },
  {
    name: '用户 2',
    id: 2
  },
  {
    name: '用户3',
    id: 3
  },
  {
    name: '用户 4',
    id: 4
  }
];

@withRouter
export default class UserListIndex extends Component {


  render() {
    return (
      <div>
        User List
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Link to={`/user/detail/${item.id}/${item.name}`}>{item.name}</Link>}
                description="我是一个前端开发者， 也做过PHP 和 iOS 开发，热衷研究各种技术！"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
