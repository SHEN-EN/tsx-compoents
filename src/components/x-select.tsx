import { defineComponent } from "vue";
import el from "@/style/x-select.module.scss";
import Xinput from "@/components/x-input";
export default defineComponent({
  setup() {
    const visibleChange = () => {};
    return {
      visibleChange,
    };
  },
  render() {
    const { $attrs, visibleChange } = this;
    return (
      <div class={el["el-select"]} onClick={visibleChange}>
        <Xinput
          isSelectCompoents={true}
          suffixIcon="icon-sortdown"
          readonly={true}
          disabled={$attrs.disabled as boolean}
        ></Xinput>
      </div>
    );
  },
});
