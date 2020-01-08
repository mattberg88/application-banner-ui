import { Footer, Header, UserInformation, MenuBreadCrumb } from '@fms/salesmgmt-layout';
import React from 'react';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'semantic-ui-css/semantic.min.css';
import routes from '../../routes';
import './App.css';

const App = (props: { urlPrefix: string }) => {
  const { urlPrefix } = props;
  return (
    <div>
      <Header
        environment={process.env.NODE_ENV}
        urlPrefix={urlPrefix}
        title='販売管理システム'
      />
      <UserInformation />
      <div style={{ height: '1rem' }} />
      <MenuBreadCrumb product={'product' || null} vendor={'salesVendor' || null} />

      <main className='ui container'>{routes}</main>
      <Footer version='0.0.0.0' />
    </div>
  );
};

export default App;
