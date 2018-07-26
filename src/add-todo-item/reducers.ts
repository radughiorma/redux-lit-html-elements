import {SET_PROPERTY} from './actions';

export interface AddTodoItemState {
    property : string;
    value : any;
}

export function reducers(state: AddTodoItemState[] = [], action: any) {
    switch (action.type){

        case SET_PROPERTY:{
            let myp: AddTodoItemState = {
                property: action.property,
                value: action.value
            };
            let found: boolean = false;
            if(!state || state.length === 0 ) {return [myp]}
            let r = state.map((p, i)=> {
                console.log(p, i);
                if (p.property === action.property) {
                    found = true;
                    return Object.assign({}, p, myp);
                }
                return p;
            });
            if(!found){r.push( Object.assign({}, myp))}
            return r;


        }

        default:
            return state;
    }

}