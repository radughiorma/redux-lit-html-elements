import {expect} from 'chai';

import 'mocha';

import {setProperty, SET_PROPERTY} from './actions';

describe('add-todo-item', () =>
    describe('actions', () => {
        const result = setProperty('property_name', 'property_value');
        it('should have an action to set a property', () =>
            expect(result.type).to.equal(SET_PROPERTY)
        );
        it('should return the property name', () =>
            expect(result.property).to.equal('property_name')
        );
        it('should return the property value', () =>
            expect(result.value).to.equal('property_value')
        );

    }))