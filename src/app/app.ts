import {createStore, applyMiddleware, Middleware} from 'redux';
import reducers from "./reducers"

const __logger: Middleware = (store: any) => (next: any) => (action: any) => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

const __saveState: Middleware = (store: any) => (next:any) => (action: any) =>{
    let result = next(action);
    try {
        localStorage.setItem('state', JSON.stringify(store.getState()));
    } catch (e) {
        console.error(e);
    }
    return result;
}

const __loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error(e)
        return undefined

    }
}

const app = createStore(reducers, __loadState(), applyMiddleware(__logger, __saveState));

export const printCurrentState = (msg:string = 'current state') => {
    console.log(msg, app.getState())
};

export const storeStateChangedEvent = () => {
    event = new CustomEvent('storestatechanged');
    event.initEvent('storestatechanged',true, true);

    return event;
};

export default app;