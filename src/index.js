import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose , combineReducers} from 'redux';
import {thunk} from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer =  combineReducers({
  burgerBuilder : burgerBuilderReducer,
  order:orderReducer,
  auth:authReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(
        applyMiddleware(thunk)
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
const app = (
  <Provider store={store}>
    <BrowserRouter basename="/react-my-burger">
      <App />
    </BrowserRouter>
  </Provider>
);
root.render(

  <React.StrictMode>
    {app}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
