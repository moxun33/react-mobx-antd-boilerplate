import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import * as stores from 'stores';

import App from 'components/App';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDom.render(
  <LocaleProvider locale={zhCN}>
    <AppContainer>
      <Provider {...stores}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>
  </LocaleProvider>,
  document.getElementById('root')
);
