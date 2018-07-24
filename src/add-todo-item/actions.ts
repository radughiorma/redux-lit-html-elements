export const SET_PROPERTY = 'add_form_input';

export let setProperty = (property: string, value: string) => {
    return {type: SET_PROPERTY, property: property, value: value}
};