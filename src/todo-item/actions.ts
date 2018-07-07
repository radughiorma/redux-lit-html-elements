export const ADD_TODO = 'add';
export const SET_TOOD_TITLE = 'set title';
export const SET_TODO_DESCIPTION = 'set description';
export const DELETE_TODO ='delete';
export const EDIT_TOOD = 'edit';
export const TOGGLE_TODO = 'toggle';

export let setTitle = (text: string) => {
    return {type: SET_TOOD_TITLE, text}
}
export let setDescription = (any: any) => {
    return {type: SET_TODO_DESCIPTION, any}
}

export let addTodo = () => {return {type: ADD_TODO}}
export let deleteTodo = (index: number | string) => {return { type: DELETE_TODO, index}}
export let editTodo = (index: number | string, title: string, description: any) => {
    return {
        type: EDIT_TOOD,
        index : index,
        title : title,
        description : description
    }
};
export let toggleTodo = (index: number | string) => {
    return {
        type: TOGGLE_TODO,
        index: index
    }
}