import {expect, use} from 'chai';
import assertArrays from 'chai-arrays';
import 'mocha'

use(assertArrays);

import {setProperty} from './actions';
import {reducers} from './reducers';

describe('add todo item reducers', () =>
    describe('test addTodoItem actions', () => {
        let resultState = reducers([], setProperty('prop', 'value'));
        it('should contain', () =>
            expect(resultState[0]).to.have.all.keys('property', 'value')
        )
    }
));