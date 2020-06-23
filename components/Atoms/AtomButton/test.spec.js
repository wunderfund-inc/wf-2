import { shallowMount } from "@vue/test-utils";
import Component from "./index.vue";

test("Internal Link Component", () => {
  const text = "Submit";
  const wrapper = shallowMount(Component, { propsData: { text } });
  expect(wrapper.classes()).toContain("btn");
  expect(wrapper.text()).toBe(text);
});
