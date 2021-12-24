import { defineComponent, reactive, watchEffect } from "vue";
import Xselect from "@/components/x-select";

export default defineComponent({
  setup() {
    const state = reactive({
      options: [
        {
          label: "13",
          value: 13,
        },
      ],
    });
    return {
      state,
    };
  },
  render() {
    const { state } = this;
    return <Xselect disabled={false} options={state.options}></Xselect>;
  },
});
