import {html, render} from 'lit-html';

class TodoItem extends HTMLElement {
    private readonly _shadowRoot: ShadowRoot;
    constructor(){
        super();
        // this.textContent
        this._shadowRoot = this.attachShadow({mode:"open"})
            this.appendChild(this.cloneNode(true))
        // this.render();
    }
    connectedCallback() {
        this.textContent = 'I am a custom element.';
        this.render();
    }
    render(){
        render(this.template(), this._shadowRoot);
    }
    template(){
        let style = html`<style>
:host{
display: block;
}
</style>`
        return html`
${style}
<p>${this.textContent}</p>
`;
    }
}
customElements.define('todo-item', TodoItem);
export const todoItem = () => html`<todo-item></todo-item>`;
