import { mount } from '@vue/test-utils'
import Component from './index'

describe('ButtonLink Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Component)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
