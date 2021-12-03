import * as redux from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/rootReducer';
import API from './services/apigateway';

export default function createStore() {
    return redux.createStore(
        reducer,
        redux.compose(
            redux.applyMiddleware(thunk.withExtraArgument(API)),
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
}
