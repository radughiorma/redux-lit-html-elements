import {expect, use} from 'chai';
import assertArrays from 'chai-arrays';
import 'mocha';

use(assertArrays);

import {addTodo, editTodo, deleteTodo, toggleTodo, setDescription, setTitle} from "./actions";
import {ITodoState, reducers} from "./reducers";

describe('todo item reducers', () => {
        describe('test addTodo actions', () => {
            let resultState = reducers([], addTodo('title', 'subtitle', 'description'));
            let expected = [{
                title: 'title',
                subtitle: 'subtitle',
                description: 'description',
                completed: false
            }];
            it('should contain', () =>
                expect(resultState[0]).to.have.all.keys('title', 'subtitle', 'description', 'completed'))
        });
        describe('test deleteTodo', ()=>{
            let state:ITodoState[] = [];
                state = reducers(state,addTodo('t1','s1','d1'));
                state = reducers(state,addTodo('t2','s2','d2'));
                state = reducers(state,addTodo('t3','s3','d3'));
                console.log(state);
                let resultState = reducers(state, deleteTodo(1));
                console.log(resultState);
                it('should delete the item', () => expect(resultState).to.have.length(2));
                it('should not delete the others', () => expect(resultState[1].title).to.be.equal('t3'));
        }
        )
    }
);