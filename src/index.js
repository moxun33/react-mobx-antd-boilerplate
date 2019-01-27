import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import * as stores from 'stores';

import App from 'components/App';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
/*初始化*/
renderWithHotReload(<App />);

/*热更新*/
if (module.hot) {
  module.hot.accept('components/App', () => {
    renderWithHotReload(<App />);
  });
}

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <LocaleProvider locale={zhCN}>
      <AppContainer>
        <Provider {...stores}>
          <Router>{RootElement}</Router>
        </Provider>
      </AppContainer>
    </LocaleProvider>,
    document.getElementById('app')
  );
}
