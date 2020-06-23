import { shallowMount } from "@vue/test-utils";
import Component from "./index.vue";

test("External Link Component", () => {
  const url = "https://www.google.com";
  const title = "Google";
  const wrapper = shallowMount(Component, {
    propsData: { href: url, text: title }
  });
  expect(wrapper.attributes("href")).toBe(url);
  expect(wrapper.text()).toBe(title);
});
