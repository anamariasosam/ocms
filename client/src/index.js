import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import cookie from 'react-cookies'
import reducers from './reducers/index'
import App from './App'
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = cookie.load('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
