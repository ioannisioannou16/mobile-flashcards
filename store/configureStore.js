import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import reducers from '../reducers/index'

const config = { key: 'mobile_flashcards', storage }

const configureStore = () => {
  const reducer = persistCombineReducers(config, reducers)
  const store = createStore(reducer, applyMiddleware(thunk))
  const persistor = persistStore(store)
  return { persistor, store }
}

export default configureStore