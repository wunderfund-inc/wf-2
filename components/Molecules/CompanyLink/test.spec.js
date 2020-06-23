import { shallowMount } from "@vue/test-utils";
import Component from "./index.vue";

test("Internal Link Component", () => {
  const wrapper = shallowMount(Component);
  expect(wrapper.attributes("to")).toBe("/");
  expect(wrapper.attributes("text")).toBe("Wunderfund.co");
});
