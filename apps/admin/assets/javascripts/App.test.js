import React from 'react'
import App from './App'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

Enzyme.configure({adapter: new Adapter()})

describe('component', () => {
    const store = createStore(function(){})

    describe('App', () => {
        it('is rendered', () => {
            const wrapper = shallow(<Provider store={store}><App/></Provider>)

            expect(wrapper.find(App).exists()).toBeTruthy()
        })
    })
})