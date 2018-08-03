export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

interface IVisibilityAction {
    type: string,
    filter: string
}

export let setVisibilityFilter = (filter: string):IVisibilityAction => {
    return {type: SET_VISIBILITY_FILTER, filter}
}
