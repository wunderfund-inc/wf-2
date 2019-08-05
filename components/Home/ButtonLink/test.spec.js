import { shallowMount } from '@vue/test-utils'
import ButtonLink from './index'

let wrapper

const linkClass = 'button--green'
const url = 'https://github.com/nuxt/nuxt.js'
const title = 'Github'

beforeEach(() => {
  wrapper = shallowMount(ButtonLink, {
    propsData: {
      linkClasses: linkClass,
      url,
      title
    }
  })
})

afterEach(() => wrapper.destroy())

describe('Button Link Component', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('check all prop data', () => {
    expect(wrapper.props('linkClasses')).toBe(linkClass)
    expect(wrapper.props('url')).toBe(url)
    expect(wrapper.props('title')).toBe(title)
  })

  test('rendering component with prop data', () => {
    expect(wrapper.classes()).toContain(linkClass)
    expect(wrapper.attributes('href')).toBe(url)
    expect(wrapper.text()).toBe(title)
  })
})
