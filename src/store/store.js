// // import { compose, createStore, applyMiddleware } from 'redux';
// import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger';
// import _ from 'lodash'
// // And use redux-batched-subscribe as an example of adding enhancers
// import { batchedSubscribe } from 'redux-batched-subscribe'
// import { rootReducer } from './root-reducer';

// // const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
// //   Boolean
// // );

// // const composedEnhancers = compose(applyMiddleware(...middleWares));

// // export const storeX = createStore(rootReducer, undefined, composedEnhancers);
// const debounceNotify = _.debounce(notify => notify());
// // export const store = configureStore({
// //     reducer: {
// //       todos: rootReducer,
// //     //   undefined,
// //     },
// //     composedEnhancers
// //     })
// export const store = configureStore({
//     reducer:rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//     devTools: process.env.NODE_ENV !== 'production',
//     // preloadedState,
//     enhancers: [batchedSubscribe(debounceNotify)],
//   })

import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log('type: ', action.type);
//   console.log('payload: ', action.payload);
//   console.log('currentState: ', store.getState());

//   next(action);

//   console.log('next state: ', store.getState());
// };
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware,
  // thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);