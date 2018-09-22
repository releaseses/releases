import React from 'react'
import TagPanel from './TagPanel'
import Adapter from 'enzyme-adapter-react-16/build/index'
import Enzyme, { shallow } from 'enzyme'
import Spinner from 'react-spinkit'
import { normalize } from 'normalizr'
import { tagCollection } from '../../../../../assets/schemas/tags';

Enzyme.configure({adapter: new Adapter()})

const setup = (propOverrides) => {
    return Object.assign({
        fetchTags: jest.fn(),
        isFetching: false,
        response: {
            result: []
        }
    }, propOverrides)
}


describe('component', () => {
    describe('TagPanel', () => {
        it('fetches tags on load', () => {
            const fetchTags = jest.fn()

            shallow(<TagPanel {...setup({ fetchTags: fetchTags })}/>)

            expect(fetchTags).toBeCalled()
        })

        it('shows loader', () => {
            const wrapper = shallow(<TagPanel {...setup({ isFetching: true })}/>)

            expect(wrapper.find(Spinner).length).toEqual(1)
        })

        it('shows tags', () => {
            const wrapper = shallow(<TagPanel {...setup({
                response: normalize([
                    {name: 'tag 1', slug: 'tag-1', color: '#FF0001'},
                    {name: 'tag 2', slug: 'tag-2', color: '#FF0002'},
                    {name: 'tag 3', slug: 'tag-3', color: '#FF0003'},
                ], tagCollection)
            })}/>)

            expect(wrapper.text()).toMatch(/tag 1/)
            expect(wrapper.text()).toMatch(/tag 2/)
            expect(wrapper.text()).toMatch(/tag 3/)
        })

        xit('shows placeholder when tags are empty', () => {

        })
    })
})