import React from 'react'
import TagSelect from './TagSelect'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { normalize } from 'normalizr'
import { tagCollection } from '../../../../../assets/schemas/tags'

Enzyme.configure({adapter: new Adapter()})

const setup = (propOverrides) => {
    return Object.assign({
        fetchTags: jest.fn(),
        isFetching: false,
        options: {}
    }, propOverrides)
}

describe('component', () => {
    describe('TagSelect', () => {
        it('fetches tags when mounted', () => {
            const fetchStateCallback = jest.fn()

            mount(<TagSelect {...setup({fetchTags: fetchStateCallback})}/>)

            expect(fetchStateCallback).toBeCalled()
        })

        it('lists options', () => {
            const options = [
                {slug: 'slug_0', name: 'label 0', color: '#FF0000'},
                {slug: 'slug_1', name: 'label 1', color: '#FF0001'},
            ]
            const normalizedOptions = normalize(options, tagCollection)

            const wrapper = mount(<TagSelect {...setup({options: normalizedOptions.entities.tags})}/>)

            const actualOptions = wrapper.find('Select').props().options
            expect(actualOptions).toEqual(expect.arrayContaining([
                {"color": "#FF0000", "label": "label 0", "value": "slug_0"},
                {"color": "#FF0001", "label": "label 1", "value": "slug_1"}
            ]));
        })
    })
})