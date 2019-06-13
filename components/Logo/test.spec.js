import { mount } from '@vue/test-utils'
import Logo from '@/components/Logo'

describe('Logo Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
