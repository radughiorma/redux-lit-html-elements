import {expect} from 'chai';

import 'mocha';
import {
    addTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
    setTitle,
    setDescription,
    ADD_TODO,
    EDIT_TOOD,
    SET_TOOD_TITLE,
    SET_TODO_DESCIPTION,
    DELETE_TODO, TOGGLE_TODO
} from './actions';

describe('todo-item', () =>
    describe('actions', () => {

        it('addTodo() must return the action type', () => {
            const result = addTodo();
            expect (result.type).to.equal(ADD_TODO);
        });
        describe('setTitle()', ()=>{
            const result = setTitle(1, 'My Title');
            it('must return the action type \'' + SET_TOOD_TITLE + '\'', () =>{
                expect(result.type).to.equal(SET_TOOD_TITLE)
            });
            it('should return the title also', ()=>{
                expect(result.text).to.equal('My Title')
            });
            it('must return the index', ()=>
                expect(result.index).to.equal(1));
        });
        describe('setDescription()',()=>{
            const expected = 'My description';
            let result = setDescription(1,expected);
            it('must return the action type \'' + SET_TODO_DESCIPTION + '\'', () =>
                expect(result.type).to.equal(SET_TODO_DESCIPTION));
            it ('should return the description also', ()=>
                expect(result.any).to.equal(expected));
            it ('should accept any value', () =>{
                var any ;
                result = setDescription(1, any);
                expect(result.any).to.be.a('undefined');
            });
            it('must return the index', ()=>
                expect(result.index).to.equal(1));
        });
        describe('deleteTodo()', () =>{
            const result = deleteTodo(1);
            it(' must return the action type\''+ DELETE_TODO + '\'', ()=>
                expect(result.type).to.equal(DELETE_TODO));
            it('must return the index', ()=>
                expect(result.index).to.equal(result.index));
        });
        describe('toggleTodo()', () =>{
            const result = toggleTodo(1);
            it(' must return the action type\''+ TOGGLE_TODO + '\'', ()=>
                expect(result.type).to.equal(TOGGLE_TODO));
            it('must return the index', ()=>
                expect(result.index).to.equal(result.index));
        });
        describe('editTodo()', () =>{
            const result = editTodo(1, 'My Title', 'My Description');
            it('must return the action type\''+EDIT_TOOD +'\'', ()=>
                expect(result.type).to.equal(EDIT_TOOD));
            it('must return the index', ()=>
                expect(result.index).to.equal(1));
            it('should set the new title', ()=>
                expect(result.title).to.equal('My Title'));
            it('should set the new description', ()=>
                expect(result.description).to.equal('My Description'));
        })

    }));

