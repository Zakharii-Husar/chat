import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

//ROUTER:
import App from './App';

//REDUX:
import { store } from './app/store'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>{/*Redux provider*/}
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
