import {html, render} from "lit-html";
import {MDCPersistentDrawer, MDCPersistentDrawerFoundation, util} from '@material/drawer';
import MDCComponent from "@material/base/component";
import {storeStateChangedEvent} from "../app/app";
import {VisibilityFilters} from "../app/reducers";
import {setVisibilityFilter} from "../app/action";
let toggleMenu = (e: CustomEvent) => {
    console.log('toggleMenu');
    let menu = document.querySelector('.mdc-menu__items');
    if(menu) {
        let isHidden: boolean = menu.getAttribute('aria-hidden') === 'true' ? true : false;
        menu.setAttribute('aria-hidden', String(!isHidden));

    }
    console.log('toggleMenu', menu);
}

let el = document.querySelector('.mdc-drawer--persistent');
let drawer:MDCPersistentDrawer
if (el) drawer = new MDCPersistentDrawer(el);
let radioFormField = (id:string, label: string, filter: string) => html`
<div class="mdc-form-field">
  <div class="mdc-radio">
    <input class="mdc-radio__native-control" type="radio" name="radios" 
           id="${id}" on-click=${(e:Event)=> dispatchEvent(storeStateChangedEvent(setVisibilityFilter(filter)))}">
            <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
    
  </div>
  <label for="${id}">${label}</label>
  </div>
`;
const menu = (title: string, content: any) => html`
<div style="display: inline-flex">
<header class="mdc-top-app-bar mdc-top-app-bar--fixed">
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      <a href="#" class="material-icons mdc-top-app-bar__navigation-icon" on-click="${() => {
    let querySelector = document.querySelector('.mdc-drawer--persistent');
    if (querySelector){
        let drawer = new MDCPersistentDrawer(querySelector);
              drawer.open = !drawer.open}}}">menu</a>
      <span class="mdc-top-app-bar__title">${title}</span>
    </section>
  </div>
  </header>
<aside class="mdc-drawer mdc-drawer--persistent mdc-typography">
  <nav class="mdc-drawer__drawer mdc-top-app-bar--fixed">
    <header class="mdc-drawer__header ">
      <div class="mdc-drawer__header-content">
        Filter
      </div>
    </header>
    <nav id="icon-with-text-demo" class="mdc-drawer__content mdc-list">
      ${radioFormField('checkbox-1','Show all', VisibilityFilters.SHOW_ALL)}
      ${radioFormField('checkbox-2','Show completed', VisibilityFilters.SHOW_COMPLETED)}
      ${radioFormField('checkbox-3','Show active', VisibilityFilters.SHOW_ACTIVE)}
    </nav>
</nav>
</aside>
<main>
<div class="mdc-component mdc-top-app-bar--fixed-adjust">
  <p>${content}</p>
  </div>
</main>
</div>
</div>
`;
export default menu;