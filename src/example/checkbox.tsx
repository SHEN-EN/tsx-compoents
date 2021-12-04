import { defineComponent, reactive } from "vue";
import Xcheckbox from "@/components/x-checkbox";
export default defineComponent({
  setup() {
    const state = reactive({
      checked: false,
    });
    return {
      state,
    };
  },
  render() {
    const { state } = this;
    return (
      <div class="render-component">
        <Xcheckbox v-model={[state.checked,'checked']}>123</Xcheckbox>
      </div>
    );
  },
});
