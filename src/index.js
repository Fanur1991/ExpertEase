import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { Flex, Spin, ConfigProvider } from 'antd';
import './lang/i18next';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Suspense
      fallback={
        <Flex align="center" justify="center">
          <Spin size="large" />
        </Flex>
      }
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider theme={{ cssVar: true, hashed: false }}>
            <App />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </BrowserRouter>
);
