import { defineComponent, PropType } from "vue";
import el from "@/style/x-input.module.scss";
export default defineComponent({
  props: {
    type: {
      type: String as PropType<string>,
      default: "text",
    },
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    suffixIcon: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, context) {
    const handlerInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      context.emit("update:modelValue", target.value);
    };
    return {
      handlerInput,
    };
  },
  render() {
    const { handlerInput, $props } = this;
    return (
      <div class={el["el-input"]}>
        <input
          type="text"
          value={$props.modelValue}
          disabled={$props.disabled}
          class={el["el-input-inner"]}
          onInput={(e) => handlerInput(e)}
        />
        <span class={el['el-input-suffixicon']}>
            <i class={["iconfont icon-sortdown",$props.suffixIcon]}></i>
        </span>
      </div>
    );
  },
});
