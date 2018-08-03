import {reducers as todoItemReducers} from "../todo-item/reducers";
import {reducers as addTodoItemReducers} from "../add-todo-item/reducers";

import {combineReducers} from  'redux';
import {SET_VISIBILITY_FILTER} from "./action";



export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const {SHOW_ALL} = VisibilityFilters;


function visibilityFilter(state: string = SHOW_ALL, action: any) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}
const reducers = combineReducers({
    todoItemReducers,
    addTodoItemReducers,
    visibilityFilter
});
export default reducers;