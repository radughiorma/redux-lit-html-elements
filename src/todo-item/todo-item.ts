import {html, render, TemplateResult} from 'lit-html';

let TITLE = 'mytitle';
let SUBTITLE = 'subtitle';
let TEXT = 'text';
interface ITodoItem {
    mytitle: string | undefined;
    subtitle: string | undefined;
    text: string | undefined;
    _shadowRoot: ShadowRoot;
    imgUrl: any;
    [key: string] : any;

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
    mytitle: string | undefined;
    subtitle: string | undefined;
    text: string | undefined;
    imgUrl: any;
    [key: string]: any;

   static _imgUrl() {return fetch("https://picsum.photos/g/200/300/?random").then(response => response['url'])}
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "closed"});
        this.imgUrl = TodoItem._imgUrl();
        console.log(this, this.getAttribute('mytitle'), this[SUBTITLE], this[TEXT]);
        [TITLE, SUBTITLE, TEXT].forEach((a) => this[a] = this.hasAttribute(a) ? this.getAttribute(a): undefined);
    }

    connectedCallback() {
        this.textContent = 'I am a custom element.';
        console.log(this, (this)['mytitle'], this[SUBTITLE], this[TEXT]);
        console.log(this, this.getAttribute('mytitle'), this[SUBTITLE], this[TEXT]);
        this.render();
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log('Custom TodoItem element attributes changed.', name, oldValue, newValue);

        console.log(this, (this)['mytitle'], this[SUBTITLE], this[TEXT]);
        // console.log('Custom TodoItem element attributes changed.');
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
        let imgUrl = () => fetch("https://picsum.photos/g/200/300/?random").then(response => response['url']);
        let myStyle = html`

      <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Roboto+Mono">
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    
<link rel="stylesheet" type="text/css" href="css/app.css">
    <style>
    .my-card {
  height: 350px;
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
            <div class="mdc-card__title mdc-typography--headline6">${this[TITLE]}</div>
            <div class="mdc-card__subtitle">${this[SUBTITLE]}</div>
            <div class="mdc-card__supporting-text">${this[TEXT]}</div>
        </div>
    </div>
    
    <div class="mdc-card__actions">
    <div class="mdc-card__action-buttons">
      <button class="mdc-button mdc-card__action mdc-card__action--button">Done</button>
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

}

customElements.define('todo-item', TodoItem);
// export const todoItem = (title:string = 'title', subtitle:string = 'subtitle', supportingText: string = 'suporting text') =>
//     html`<todo-item title="${title}" subtitle="${subtitle}"></todo-item>`;