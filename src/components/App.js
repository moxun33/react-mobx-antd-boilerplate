/**
 * created by   moxingxum on 2018-07-08 22:02
 *
 **/

import React, {Component, PropTypes} from 'react';
import {createBundle} from 'components/Common'
import Login from 'bundle-loader?lazy&name=login!pages/Login';
import Main from 'bundle-loader?lazy&name=main!pages/Main';
import {observer, inject} from 'mobx-react';
import { Route,  } from 'react-router-dom';
@inject('appStore')
@observer
export default class App extends Component {

    render() {
        const { isLogined } = this.props.appStore;
        return (
            <div>
                {
                    isLogined ?
                        createBundle(Main)
                        : <Route components={createBundle(Login)}/>
                }

            </div>
        )
    }
}