import {ADD_TODO, EDIT_TOOD, DELETE_TODO, SET_TOOD_TITLE, SET_TODO_DESCIPTION, TOGGLE_TODO} from "./actions";

export interface ITodoState {
    title : string,
    subtitle : string,
    description : string,
    completed : boolean
}

export function reducers(state: ITodoState[] = [] , action: any):ITodoState[]  {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    title: action.title,
                    subtitle: action.subtitle,
                    description: action.description,
                    completed: false
                }
            ];
        case DELETE_TODO:
            state.splice(action.index, 1);
            return state;
        case EDIT_TOOD:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo,
                        {
                            title: action.title,
                            subtitle: action.subtitle,
                            description: action.description,
                            completed: todo.completed
                        })
                }
                return todo;
            });
        case SET_TOOD_TITLE:
            return state.map((todo, index)=>{
                if(index === action.index){
                    return Object.assign({}, todo,
                        {
                            title : action.title,
                            subtitle: action.subtitle,
                            description: todo.description,
                            completed : todo.completed
                        })
                }
                return todo;
            });
        case SET_TODO_DESCIPTION:
            return state.map((todo, index)=>{
                if(index === action.index){
                    return Object.assign({}, todo,
                        {
                            title : todo.title,
                            description: action.description,
                            completed : todo.completed
                        })
                }
                return todo;
            });
        case TOGGLE_TODO:
            return state.map((todo, index)=> {
                if(index == action.index){
                    return Object.assign({}, todo,{completed: !todo.completed})
                }
                return todo;
            });
        default:
            return state;

    }
}