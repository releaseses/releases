import React from 'react'
import ReleaseList from './ReleaseList'
import Spinner from 'react-spinkit'
import Adapter from 'enzyme-adapter-react-16/build/index'
import Enzyme, { shallow } from 'enzyme'

Enzyme.configure({adapter: new Adapter()})

const setup = (propOverrides) => {
    return Object.assign({
        fetchReleases: jest.fn(),
        isFetching: false,
        releases: []
    }, propOverrides)
}

describe('component', () => {
    describe('ReleaseList', () => {
        it('fetches releases on load', () => {
            const fetchReleases = jest.fn()

            shallow(<ReleaseList { ...setup({fetchReleases: fetchReleases}) } />)

            expect(fetchReleases).toBeCalled()
        })

        it('shows loader', () => {
            const wrapper = shallow(
                <ReleaseList {...setup({isFetching: true})} />
            )

            expect(wrapper.find(Spinner).length).toEqual(1)
        })

        it('has link to create release page', () => {
            const wrapper = shallow(
                <ReleaseList {...setup({isFetching: false})} />
            )

            expect(wrapper.text()).toMatch(/You can create your first release/)
        })

        it('renders list of releases', () => {
            const wrapper = shallow(
                <ReleaseList {...setup({releases: [
                        {
                            id: 3,
                            title: 'title 3',
                            version: '3.0.0'
                        },
                        {
                            id: 2,
                            title: 'title 2',
                            version: '2.0.0'
                        },
                        {
                            id: 1,
                            title: 'title 1',
                            version: '1.0.0'
                        },
                    ]})} />
            )


            expect(wrapper.text()).toMatch(/title 1/)
            expect(wrapper.text()).toMatch(/title 2/)
            expect(wrapper.text()).toMatch(/title 3/)
        })
    })
})