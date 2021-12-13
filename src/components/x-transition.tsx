import { defineComponent } from "vue";
import el from "@/style/transiton.scss";
export default defineComponent({
  setup() {},
  render() {
    const { $slots } = this;
    return (
      <transition>
        {$slots.default?.()}
      </transition>
    );
  },
});
