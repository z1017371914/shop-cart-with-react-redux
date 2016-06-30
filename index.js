import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllProducts } from './actions'
import App from './containers/App'

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const createStoreWithMiddleware = compose(applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)
const store = createStoreWithMiddleware(reducer)

store.dispatch(getAllProducts())
//这是因为没用使用createStore,如果使用createStore,可以传入一个初始状态

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
