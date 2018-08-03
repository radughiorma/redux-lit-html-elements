import {html, render} from 'lit-html/lib/lit-extended';

import app, {getVisibleTodos, printCurrentState} from '../app/app';
import menu from '../menu/menu';

let style = html`
<link rel="stylesheet" type="text/css" href="css/app.css">
<style>
.my-grid {
    display: grid;
    grid-template-columns: ;
}
.my-flex {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
}
</style>
`

let todo = (id:string | number, title: string, subtitle:string, description: string) => html`
<todo-item index="${id}" mytitle="${title}" subtitle="${subtitle}" text="${description}"></todo-item>
`
let todoList = () => {
    let todos = getVisibleTodos(app.getState().todoItemReducers, app.getState().visibilityFilter);
    return todos.map((t, index) => {
            return todo(index, t.title, t.subtitle, t.description);
        }
    )
}
const el = document.querySelector('#demo_container');
let __app = () => html`
<add-todo store="${app}"></add-todo>

<div class="mdc-snackbar mdc-snackbar--align-start"
     aria-live="assertive"
     aria-atomic="true"
     aria-hidden="true">
  <div class="mdc-snackbar__text"></div>
  <div class="mdc-snackbar__action-wrapper">
    <button type="button" class="mdc-snackbar__action-button"></button>
  </div>
</div>

<div style="width: available">
<div class="my-flex">
    ${todoList()}
</div>
</div>
`
let demo = () => html`
${style}
${printCurrentState('demo html')}
<header>${menu('Redux Lit Html Elements', __app())}</header>
<p>Demo</p>
<h2>Todo Item Demo</h2>
`;
render(demo(), el as Element);
window.addEventListener('storestatechanged',(e:Event) => {
    let isCustomEvent = (e:Event):e is CustomEvent => true;
    if(isCustomEvent(e)){
        console.log('storestatechanged',e.detail);
        app.dispatch(e.detail);
    }
    return render(demo(), el as Element)
});