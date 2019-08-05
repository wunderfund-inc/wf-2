import { shallowMount } from '@vue/test-utils'
import Logo from './index'

let wrapper

beforeEach(() => (wrapper = shallowMount(Logo)))

afterEach(() => wrapper.destroy())

describe('Logo Component', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('all classes are accounted for', () => {
    expect(wrapper.classes()).toContain('VueToNuxtLogo')
    expect(wrapper.contains('.VueToNuxtLogo')).toBe(true)
  })
})
