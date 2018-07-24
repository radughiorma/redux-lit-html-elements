import {SET_PROPERTY} from './actions';

export interface AddTodoItemState {
    property : string;
    value : any;
}

export function reducers(state: AddTodoItemState[] = [], action: any) {
    switch (action.type){
        case SET_PROPERTY:
            return [
                ...state,
                {
                    property: action.property,
                    value: action.value
                }
            ]
        default:
            return state;
    }

}