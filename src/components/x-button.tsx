import { defineComponent, PropType, reactive } from "vue";
import el from "@/style/x-button.module.scss";
export default defineComponent({
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    type:{
      type:String as PropType<string>,
      default:''
    }
  },
  setup(props, context) {
    const state = reactive({});
    return {
      state,
    };
  },
  render() {
    const { state, $props, $slots } = this;
    return (
      <button class={[el["el-button"], $props.disabled && el["el-disabled"], el[$props.type]]} disabled={$props.disabled}>
        {$slots.default?.()}
      </button>
    );
  },
});
