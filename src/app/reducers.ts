import {reducers as todoItemReducers} from "../todo-item/reducers";
import {reducers as addTodoItemReducers} from "../add-todo-item/reducers";

import {combineReducers} from  'redux';

const reducers = combineReducers({
    todoItemReducers,
    addTodoItemReducers
});

export default reducers;