import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const history = createBrowserHistory()
const loggerMiddleware = createLogger()

let middlewares = [routerMiddleware(history), thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
}

const store = createStore(
    connectRouter(history)(reducer),
    applyMiddleware(...middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>, document.getElementById('root'));

registerServiceWorker();
