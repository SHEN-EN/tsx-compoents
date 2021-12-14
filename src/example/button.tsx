import { defineComponent, reactive } from "vue";
import Xbutton from "@/components/x-button";

export default defineComponent({
  setup() {
    const state = reactive({
      checked: true,
    });
    return {
      state,
    };
  },
  render() {
    const { state } = this;
    return <Xbutton>123</Xbutton>;
  },
});
