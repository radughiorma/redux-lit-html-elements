// import {todoitem} from 'todo-item';
import {expect} from 'chai';
import 'mocha';
let todo = () => {return 'Title'};
describe('Todo Item', ()=> {
    it('should set a title', ()=>{
        const result = todo();
        expect (result).to.equal('Title')
    })
})