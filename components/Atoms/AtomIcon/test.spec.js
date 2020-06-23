import { shallowMount } from "@vue/test-utils";
import Component from "./index.vue";

test("Fontawesome Icon Component (Solid)", () => {
  const style = "fas";
  const icon = "ad";
  const wrapper = shallowMount(Component, { propsData: { s: style, i: icon } });
  expect(wrapper.attributes("icon")).toBe("fas,ad");
});

test("Fontawesome Icon Component (Brand)", () => {
  const style = "fab";
  const icon = "google";
  const wrapper = shallowMount(Component, { propsData: { s: style, i: icon } });
  expect(wrapper.attributes("icon")).toBe("fab,google");
});
