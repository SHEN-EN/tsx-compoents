import { defineComponent, reactive, onMounted, PropType } from "vue";
import el from "@/style/x-select.module.scss";
import Xinput from "@/components/x-input";
import Xtransition from "@/components/x-transition";
import { option } from "@/type/select";
export default defineComponent({
  props: {
    options: {
      type: Array as PropType<option[]>,
      default: [],
    },
  },
  setup(props, context) {
    const state = reactive({
      isChange: false,
    });
    const visibleChange = () => {
      state.isChange = !state.isChange;
      context.emit("visible-change", state.isChange);
    };
    function change<T>(value: T) {
      debugger;
    }
    const handlerOther = () => {
      state.isChange = false;
    };
    onMounted(() => {});
    return {
      visibleChange,
      change,
      state,
    };
  },
  render() {
    const { $attrs, visibleChange, state, $props, change } = this;
    return (
      <div class={el["el-select"]} onClick={visibleChange}>
        <Xinput
          reversal={state.isChange}
          suffixIcon="icon-arrow-down"
          readonly={true}
          disabled={$attrs.disabled as boolean}
          selectCompoents={true}
        ></Xinput>
        <Xtransition>
          {$props.options.length && state.isChange && (
            <>
              <ul class={el["el-select-dropdown"]}>
                {$props.options.map((item) => {
                  return (
                    <li
                      class={el["el-select-dropdown-item"]}
                      onClick={() => change(item.value)}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
              <div class={el["popper__arrow"]}></div>

            </>
          )}
        </Xtransition>
      </div>
    );
  },
});
