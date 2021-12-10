import { defineComponent, reactive,watchEffect } from "vue";
import Xcheckbox from "@/components/x-checkbox";
import Xtransition from "@/components/x-transition";

export default defineComponent({
  setup() {
    const state = reactive({
      checked: true,
    });
    watchEffect(()=>{
      console.log(state.checked);
    })
    return {
      state,
    };
  },
  render() {
    const { state } = this;
    return (
      <Xtransition>
        {state.checked && (
          <div class="render-component">
            <Xcheckbox v-model={[state.checked, "checked"]}>123</Xcheckbox>
          </div>
        )}
      </Xtransition>
    );
  },
});
