import {html, render} from 'lit-html/lib/lit-extended';
import {TemplateResult} from "lit-html";

import app, {printCurrentState, storeStateChangedEvent} from '../app/app';
import {deleteTodo, toggleTodo} from "./actions";
import {Store} from "redux";

let TITLE = 'mytitle';
let SUBTITLE = 'subtitle';
let TEXT = 'text';
let INDEX = 'index';

interface ITodoItem {
    mytitle: string;
    subtitle: string;
    text: string ;
    index: string;
    _shadowRoot: ShadowRoot;
    imgUrl: any;


    connectedCallback(): void;

    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;

    disconnectedCallback(): void;

    adoptedCallback(): void;

    render(): void;

    template(): TemplateResult;
}

class TodoItem extends HTMLElement implements ITodoItem {
    readonly _shadowRoot: ShadowRoot;
    // subhead: string;
    // title: string;
    // subtitle: string
    // mytitle: string | undefined;
    imgUrl: any;
    private store: Store<any> & { dispatch: any };

    static _imgUrl() {
        return fetch("https://picsum.photos/g/200/300/?random").then(response => response['url'])
    }

    constructor() {
        super();
        console.log('Custom TodoItem element constructor');
        this._shadowRoot = this.attachShadow({mode: "closed"});
        this.imgUrl = TodoItem._imgUrl();
        this.store = app;
        // [TITLE, SUBTITLE, TEXT].forEach((a) => this[a] = this.hasAttribute(a) ? this.getAttribute(a) : undefined);
    }

    static get observedAttributes() {
        return [TITLE, SUBTITLE, TEXT, INDEX, 'store'];
    }

    get index(): string {
        return this.__get(INDEX);
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

    set index(val: string){
        this.__set(INDEX, val);
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
        return this.hasAttribute(attr) ? this.getAttribute(attr) : undefined;
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
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log('Custom TodoItem element attributes changed.', name, oldValue, newValue);
        this.render();

    }

    disconnectedCallback() {
        console.log('Custom TodoItem element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom TodoItem element moved to new page.');
    }

    render() {
        render(this.template(), this._shadowRoot);
    }

    template() {
        // let imgUrl = () => fetch("https://picsum.photos/g/200/300/?random").then(response => response['url']);
        let myStyle = html`

      <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Roboto+Mono">
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    
<link rel="stylesheet" type="text/css" href="css/app.css">
    <style>
    .my-card {
  /*height: 350px;*/
  width: 350px;
}
.my-card__media {
    background-image: url(${this.imgUrl})
}
</style>
    
`
        return html`
${myStyle}

<div class="my-card mdc-card">

    <div class="mdc-card__primary-action">
        <div class="my-card__media mdc-card__media mdc-card__media--16-9">
            
        </div>
   
        <div class="mdc-typography">
            <div class="mdc-card__title mdc-typography--headline6">${this.mytitle}</div>
            <div class="mdc-card__subtitle">${this.subtitle}</div>
            <div class="mdc-card__supporting-text">${this.text}</div>
        </div>
    </div>
    
    <div class="mdc-card__actions">
    <div class="mdc-card__action-buttons">
      <button class="mdc-button mdc-card__action mdc-card__action--button" on-click=${(e: CustomEvent)=>this.__doneEvent(e)}>Done</button>
      <button class="mdc-button mdc-card__action mdc-card__action--button" on-click=${(e: CustomEvent)=>this.__deleteEvent(e)}>Delete</button>
    </div>
        <div class="mdc-card__action-icons">
      <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Favorite">favorite_border</button>
      <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Share">share</button>
      <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="More options">more_vert</button>
    </div>
    </div>
</div>

`;
    }

    private __doneEvent(e: CustomEvent){
        this.dispatchEvent(storeStateChangedEvent(toggleTodo(this.index)));
    }
    private __deleteEvent(e: CustomEvent){
        this.dispatchEvent(storeStateChangedEvent(deleteTodo(this.index)));
    }

}

customElements.define('todo-item', TodoItem);
// export const todoItem = (title:string = 'title', subtitle:string = 'subtitle', supportingText: string = 'suporting text') =>
//     html`<todo-item title="${title}" subtitle="${subtitle}"></todo-item>`;