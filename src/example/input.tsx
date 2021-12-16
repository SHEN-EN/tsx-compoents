import { defineComponent, reactive,watchEffect } from "vue";
import Xinput from "@/components/x-input";

export default defineComponent({
  setup() {
    const state = reactive({
      value: '1dwadaw23',
    });
    watchEffect(()=>{
        console.log(state.value)
    })
    return {
      state,
    };
  },
  render() {
    const { state } = this;
    return <Xinput v-model={[state.value,['value']]}>123</Xinput>;
  },
});
