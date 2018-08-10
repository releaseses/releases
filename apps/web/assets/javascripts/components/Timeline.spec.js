import React from 'react'
import Timeline from './Timeline'
import Spinner from 'react-spinkit'
import { Link } from 'react-router-dom'
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
    describe('Timeline', () => {
        it('fetches releases on load', () => {
            const fetchReleases = jest.fn()

            shallow(<Timeline {...setup({ fetchReleases: fetchReleases })}/>)

            expect(fetchReleases).toBeCalled()
        })

        it('shows loader', () => {
            const wrapper = shallow(<Timeline {...setup({ isFetching: true })}/>)

            expect(wrapper.find(Spinner).length).toEqual(1)
        })

        it('shows releases', () => {
            const wrapper = shallow(
                    <Timeline {...setup({
                        releases: [
                            {
                                id: 2,
                                version: '1.0.2',
                                title: 'Release 1.0.2',
                                released_at: '2001-09-09 01:46:40'
                            },
                            {
                                id: 1,
                                version: '1.0.1',
                                title: 'Release 1.0.1',
                                released_at: '2001-09-09 01:46:40'
                            },
                        ]
                    })}/>)

            expect(wrapper.find(Link).first().props().to).toMatch(/1\.0\.2/)
            expect(wrapper.find(Link).last().props().to).toMatch(/1\.0\.1/)
        })
    })
})