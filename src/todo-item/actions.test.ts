import {expect} from 'chai';
import 'mocha';

import {addTodo, deleteTodo, editTodo, setTitle, setDescription, ADD_TODO,EDIT_TOOD,SET_TOOD_TITLE,SET_TODO_DESCIPTION} from './actions';
describe('todo-item', () =>
    describe('actions', () => {
        it('addTodo() must return the action type', () => {
            const result = addTodo();
            expect (result.type).to.equal(ADD_TODO);
        });
        describe('setTitle()', ()=>{
            const result = setTitle('My Title');
            it('must return the action type \'' + SET_TOOD_TITLE + '\'', () =>{
                expect(result.type).to.equal(SET_TOOD_TITLE)
            });
            it('should return the title also', ()=>{
                expect(result.text).to.equal('My Title')
            });
        });
        describe('setDescription()',()=>{
            const expected = 'My description';
            let result = setDescription(expected);
            it('must return the action type \'' + SET_TODO_DESCIPTION + '\'', () =>
                expect(result.type).to.equal(SET_TODO_DESCIPTION));
            it ('should return the description also', ()=>
                expect(result.any).to.equal(expected));
            it ('should accept any value', () =>{
                var any ;
                result = setDescription(any);
                expect(result.any).to.be.a('undefined');
            });
        })
    }));
