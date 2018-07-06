import {html, render} from 'lit-html';
import {todoItem} from "../todo-item/todo-item";


let demo = () => html`
<html>
<style>
{
display: block;
}
</style>
<body>
<header>Redux Lit Html Elements1</header>
<p>Demo</p>
<h2>Todo Item Demo</h2>
<todo-item>
</todo-item>
</body>
</html>
`;
render(demo(), document.body)