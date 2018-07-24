import {html, render} from 'lit-html'

class AddTodoItem extends HTMLElement {
    readonly _shadowRoot: ShadowRoot;

    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: 'closed'});
    }

    connectedCallback(){
        this.render();
    }
    render(){
        render(this.template(), this._shadowRoot);
    }

    template(){
        let __input = (id: string, value: string, label: string = 'Add some value for the ' + id) => html`
            <div class="mdc-text-field mdc-text-field--box">
                <input type="text" id="${id}" class="mdc-text-field__input" value="${value}">
                <label class="mdc-floating-label mdc-floating-label--float-above mdc-typography--caption" for="${id}">
                   ${label}
                </label>
                <div class="mdc-line-ripple"></div>
            </div>
        `;
        let mystyle = html`
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Roboto+Mono">
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" type="text/css" href="css/app.css">
            <style>
                
                .my-card__media {
                    height: 100px;
                    background-image: url("https://picsum.photos/200/300?image=994&blur");
                }
            </style>
        `;
        return html`
${mystyle}
    <div class="my-todo-form mdc-card">
            <div class="my-card__media mdc-card__media mdc-card__media--16-9">
            </div>    
            <div class="mdc-typography">
                <div class="mdc-typography--headline3">Add Todo</div>
                ${__input('title', 'my title')}
                ${__input('subtitle', 'my subtitle')}
                ${__input('text', 'my text')}
            </div>
         <div class="mdc-card__actions">
    <div class="mdc-card__action-buttons">
      <button class="mdc-fab--extended mdc-card__action mdc-card__action--button">
       <span class="mdc-fab__label">Add</span>
       <span class="mdc-fab__icon material-icons">add</span>
      </button>
    </div>
    </div>
    </div>
        `
    }
}

customElements.define('add-todo', AddTodoItem);