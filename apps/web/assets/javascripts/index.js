import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import Viewer from './Viewer'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const history = createBrowserHistory()

let middlewares = [routerMiddleware(history), thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
}

const store = createStore(
    connectRouter(history)(reducer),
    applyMiddleware(...middlewares)
)

ReactDOM.render(
    <Provider store={store}>
        <Viewer history={history}/>
    </Provider>, document.getElementById('root'));

registerServiceWorker();
