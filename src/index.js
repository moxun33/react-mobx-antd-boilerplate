import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter>
      <LocaleProvider locale={zhCN}>
        <AppContainer>
          <Provider {...stores}>{RootElement}</Provider>
        </AppContainer>
      </LocaleProvider>
    </BrowserRouter>,
    document.getElementById('app')
  );
}
