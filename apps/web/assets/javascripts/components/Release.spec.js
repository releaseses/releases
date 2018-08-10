import React from 'react'
import Release from './Release'
import Adapter from 'enzyme-adapter-react-16/build/index'
import Enzyme, { shallow, mount } from 'enzyme'
import Spinner from 'react-spinkit'

Enzyme.configure({adapter: new Adapter()})

const setup = (propOverrides) => {
    return Object.assign({
        fetchRelease: jest.fn(),
        resetRelease: jest.fn(),
        isFetching: false,
        notFound: false,
        release: {
            version: '',
            title: '',
            released_at: '',
            summary_raw: '',
            summary_html: '',
        }
    }, propOverrides)
}


describe('component', () => {
    describe('Release', () => {
        it('fetches the release on load', () => {
            const fetchRelease = jest.fn()

            shallow(<Release {...setup({ fetchRelease: fetchRelease })}/>)

            expect(fetchRelease).toBeCalled()
        })

        it('shows loader', () => {
            const wrapper = shallow(<Release {...setup({ isFetching: true })}/>)

            expect(wrapper.find(Spinner).length).toEqual(1)
        })

        it('shows release', () => {
            const wrapper = shallow(<Release {...setup({
                release: {
                    version: '1.0.1',
                    title: 'Release title',
                    released_at: '2001-09-09 01:46:40',
                    summary_raw: 'summary_raw',
                    summary_html: 'Release summary_html',
                }
            })}/>)

            expect(wrapper.text()).toMatch(/Release title/)
            expect(wrapper.text()).toMatch(/1\.0\.1/)
        })

        it('resets when release not found', () => {
            const resetRelease = jest.fn()

            shallow(<Release {...setup({
                notFound: true,
                resetRelease: resetRelease
            })}/>)

            expect(resetRelease).toBeCalled()
        })
    })
})