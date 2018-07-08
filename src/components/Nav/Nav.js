import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Nav extends Component {

    state = {
        current: 'index',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="index">
                     <Link to="/">首页</Link>
                </Menu.Item>
                <Menu.Item key="user" >
                     <Link to="/user">用户</Link>
                </Menu.Item>
                <Menu.Item key="antd" >
                     <Link to="/antd">Antd</Link>
                </Menu.Item>
            </Menu>


        )
    }
}