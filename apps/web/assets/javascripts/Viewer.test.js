import React from 'react'
import Viewer from './Viewer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

Enzyme.configure({adapter: new Adapter()})

describe('component', () => {
    const store = createStore(function(){})

    describe('Viewer', () => {
        it('is rendered', () => {
            const wrapper = shallow(<Provider store={store}><Viewer/></Provider>)

            expect(wrapper.find(Viewer).exists()).toBeTruthy()
        })
    })
})
