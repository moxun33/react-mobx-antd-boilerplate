
import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import getRouter from 'router/router';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'mobx-react';
import * as stores from 'stores';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
/*初始化*/
renderWithHotReload(getRouter());
/*热更新*/
if (module.hot) {
    module.hot.accept('router/router', () => {
        const getRouter = require('router/router').default;
        renderWithHotReload(getRouter());
    });
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider {...stores}>
                <Router>
                    {RootElement}
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
    OfflinePluginRuntime.install();
}
