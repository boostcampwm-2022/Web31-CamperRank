import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {RecoilRoot} from 'recoil';
import {GlobalStyle} from "./styles/GlobalStyle";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <GlobalStyle/>
    <RecoilRoot>
      <App/>
    </RecoilRoot>
  </>
)
