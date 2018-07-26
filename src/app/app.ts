import {createStore, applyMiddleware, Middleware} from 'redux';
import reducers from "./reducers"

const __logger: Middleware = (store: any) => (next: any) => (action: any) => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

const app = createStore(reducers, applyMiddleware(__logger));

export const printCurrentState = (msg:string = 'current state') => {
    console.log(msg, app.getState())
};

export const storeStateChangedEvent = () => {
    event = new CustomEvent('storestatechanged');
    event.initEvent('storestatechanged',true, true);

    return event;
};

export default app;