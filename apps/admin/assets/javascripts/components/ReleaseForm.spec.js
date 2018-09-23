import React from 'react'
import ReleaseForm from './ReleaseForm'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { reduxForm } from 'redux-form'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

Enzyme.configure({adapter: new Adapter()})

const setup = (propOverrides) => {
    return Object.assign({
        submitSuccessfully: jest.fn(),
        fetchInitialState: jest.fn(),
        isFetching: false,
        successfullyUpdated: false,
        validationErrors: [],
        release: {
            version: '',
            title: '',
            released_at: '',
            summary_raw: '',
            summary_html: '',
        }
    }, propOverrides)
}

const Form = (propOverrides) => {
    const store = createStore(
        function () {
            return {
                tags: {
                    response: {
                        entities: {
                            tags: []
                        }
                    }
                }
            }
        },
        applyMiddleware(thunkMiddleware)
    )
    const WrappedForm = reduxForm({form: 'release'})(ReleaseForm)
    return (<Provider store={store}>
        <WrappedForm {...setup(propOverrides)}/>
    </Provider>)
}

describe('component', () => {
    describe('ReleaseForm', () => {
        it('calls function on submit', () => {
            const submitSuccessfully = jest.fn()
            const wrapper = mount(<Form {...setup({
                submitSuccessfully: submitSuccessfully,
                release: {
                    version: '1.0.0',
                    title: 'title',
                    released_at: 'released_at',
                    summary_raw: 'summary_raw',
                    summary_html: 'summary_html',
                }
            })}/>)

            wrapper
                .find('#release-form')
                .simulate('submit')

            expect(submitSuccessfully).toBeCalled()
        })

        it('calls function when mounted', () => {
            const fetchStateCallback = jest.fn()

            mount(<Form {...setup({fetchInitialState: fetchStateCallback})}/>)

            expect(fetchStateCallback).toBeCalled()
        })

        it('shows message when is successfully updated', () => {
            const wrapper = mount(<Form {...setup({successfullyUpdated: true})}/>)

            expect(wrapper.text()).toMatch(/Successfully updated/)
        })

        it('renders tag select', () => {
            let wrapper = mount(<Form {...setup()}/>)

            expect(wrapper.find('TagSelect').length).toEqual(1)
        })
    })
})