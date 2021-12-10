import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
  render() {
    const { $slots } = this;
    return(
        <transition>
            {$slots.default?.()}
        </transition>
    );
  },
});
