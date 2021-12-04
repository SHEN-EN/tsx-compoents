import { defineComponent, PropType, reactive, onMounted } from "vue";
import el from "@/style/x-checkbox.module.scss";
import { inputEvent } from "@/type/checkbox";
export default defineComponent({
  props: {
    checked: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    value: {
      type: [Number, String] as PropType<number | string>,
      default: "",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    indeterminate: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, context) {
    const state = reactive({
      checked: false,
    });
    const handlerChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      state.checked = target.checked;
      context.emit("handlerChange", state.checked, props.value);
    };
    onMounted(() => {
      state.checked = props.checked;
    });
    return {
      handlerChange,
      state,
    };
  },
  render() {
    const { handlerChange, $slots, state, $props } = this;
    return (
      <div class={el["el-checkbox"]}>
        <input
          type="checkbox"
          checked={state.checked}
          disabled={$props.disabled}
          class={el["el-checkbox-inner"]}
          onChange={($event) => handlerChange($event)}
        />
        <label class={[el['normal'],$props.indeterminate && el['indeterminate']]}>{$slots.default?.()}</label>
      </div>
    );
  },
});