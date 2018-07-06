import {html, render} from 'lit-html';

let demo = () => html`
<html>
<body>
<header>Redux Lit Html Elements1</header>
<p>Demo</p>
</body>
</html>
`;

render(demo(), document.body)