import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Component from "./index.vue";

test("Internal Link Component", () => {
  const url = "https://www.google.com";
  const title = "Google";
  const wrapper = shallowMount(Component, {
    propsData: { to: url, text: title },
    stubs: { NuxtLink: RouterLinkStub }
  });
  const item = wrapper.findComponent(RouterLinkStub);
  // TODO: check "to" prop
  expect(item.text()).toBe(title);
});
