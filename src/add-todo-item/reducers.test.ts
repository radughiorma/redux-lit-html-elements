import {expect, use} from 'chai';
import assertArrays from 'chai-arrays';
import 'mocha'

use(assertArrays);

import {setProperty} from './actions';
import {AddTodoItemState, reducers} from './reducers';

describe('add todo item reducers', () =>
    describe('test addTodoItem actions', () => {
        it('should contain', () =>{
            let resultState: AddTodoItemState[] = reducers([], setProperty('prop', 'value'));
            expect(resultState[0]).to.have.all.keys('property', 'value');
        }
        );
        let state: AddTodoItemState[] = [];
        it('should update the existing property', ()=>{
            let props: string[] = [];

            state = reducers(state, setProperty('prop1', 'value'));
            state = reducers(state, setProperty('prop', 'value1'));
            state = reducers(state, setProperty('prop12', 'value'));
            state = reducers(state, setProperty('prop', 'value2'));
            state = reducers(state, setProperty('prop1', 'value'));
            state = reducers(state, setProperty('prop', 'value3'));
            state = reducers(state, setProperty('prop12', 'value'));
            state = reducers(state, setProperty('prop', 'value4'));
            state.forEach((p)=> props.push(p.property));
            expect(props).to.have.members(['prop1','prop', 'prop12']);
            // console.log(state, state.length)
            // expect(state).to.have.contain.;
        });
        it('should have the latest value', () => expect(state[1]).to.contain({property: 'prop', value:'value4'}));

    }
));