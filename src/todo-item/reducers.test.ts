import {expect, use} from 'chai';
import assertArrays from 'chai-arrays';
import 'mocha';

use(assertArrays);

import {addTodo, editTodo, deleteTodo, toggleTodo, setDescription, setTitle} from "./actions";
import {reducers} from "./reducers";

describe('todo item reducers', () =>
    describe('test addTodo actions', () => {
        let resultState = reducers([], addTodo());
        let expected = [{
            title: 'Default value',
            description: 'Default description',
            completed: false
        }];
        it('should contain', () =>
            expect(resultState[0]).to.have.all.keys('title', 'description', 'completed'))
    })
);