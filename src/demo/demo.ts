import {html, render} from 'lit-html';
// import {todoItem} from "../todo-item/todo-item";

import * as mdc from 'material-components-web';

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
let demo = () => html`
${style}

<header>Redux Lit Html Elements</header>
<p>Demo</p>
<h2>Todo Item Demo</h2>
<add-todo></add-todo>
<div style="width: available">
<div class="my-flex">
<todo-item mytitle="title_1"></todo-item>
<todo-item mytitle="title 1" subtitle="subtitle" text="Lorem ipsum"></todo-item>
</div>
</div>
`;
const el = document.querySelector('#demo_container');
render(demo(), el as Element);

