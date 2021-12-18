import { defineComponent, reactive,watchEffect } from "vue";
import Xselect from "@/components/x-select";

export default defineComponent({
  setup() {
    const state = reactive({
      
    });
    return {
      state,
    };
  },
  render() {
    const { state } = this;
    return <Xselect disabled={false}></Xselect>;
  },
});
