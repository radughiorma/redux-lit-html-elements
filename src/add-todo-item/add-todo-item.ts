import {html, render} from 'lit-html/lib/lit-extended'
import  {printCurrentState,storeStateChangedEvent} from "../app/app";
import {setProperty} from "./actions";
import {addTodo} from "../todo-item/actions";

let TITLE = 'title';
let SUBTITLE = 'subtitle';
let TEXT = 'text';
class AddTodoItem extends HTMLElement {
    readonly _shadowRoot: ShadowRoot;
    // private __store: Store<any, Action> & { dispatch: any };
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: 'closed'});
    }
    static get observedAttributes() {
        return [TITLE, SUBTITLE, TEXT];
    }

    get mytitle(): string {
        return this.__get(TITLE);
    }

    get subtitle(): string {
        return this.__get(SUBTITLE);
    }

    get text(): string {
        return this.__get(TEXT);
    }

    set mytitle(val: string) {
        this.__set(TITLE, val);
    }

    set subtitle(val: string) {
        this.__set(SUBTITLE, val);
    }

    set text(val: string) {
        this.__set(TEXT, val);
    }

    private __get(attr: string): any {
        var my;
        my = this._shadowRoot.querySelector('#'+attr);
        // console.log('__get',attr, my.value);
        return my.value;
    }

    private __set(attr: string, val: string | null | undefined) {
        if (val) {
            this.setAttribute(attr, val);
        } else {
            this.removeAttribute(attr);
        }
    }
    connectedCallback() {
        this.textContent = 'I am a custom element.';
        this.render();
    }
    render(){
        render(this.template(), this._shadowRoot);
    }

    template(){
        let __input = (id: string, value: string, label: string = 'Add some value for the ' + id) => html`
            <div class="mdc-text-field mdc-text-field--box">
                <input type="text" id="${id}" class="mdc-text-field__input" name="${id}" value="${value}" on-change=${(e: CustomEvent)=>this.onChangeHandler(e, id, value)}>
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
      <button class="mdc-fab mdc-fab--extended mdc-card__action mdc-card__action--button"
      on-click=${(e: CustomEvent)=> this.onClickHandler(e)}>
       <span class="mdc-fab__label">Add</span>
       <span class="mdc-fab__icon material-icons">add</span>
      </button>
    </div>
    </div>
    </div>`
    }
    private onChangeHandler(e: CustomEvent, p: string, v: any){
        this.dispatchEvent(storeStateChangedEvent(setProperty(p, v)));
    }

    private onClickHandler(e: CustomEvent) {
        this.dispatchEvent(storeStateChangedEvent(addTodo(this.mytitle, this.subtitle, this.text)));
    }
}

customElements.define('add-todo', AddTodoItem);
