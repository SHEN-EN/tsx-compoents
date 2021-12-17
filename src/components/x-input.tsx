import { defineComponent, PropType, reactive, onMounted, computed } from "vue";
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
    showPassword: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    maxlength: {
      type: Number as PropType<number>,
      default: -1,
    },
    showWordLimit: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    readonly:{
      type: Boolean as PropType<boolean>,
      default: false,
    }
  },
  setup(props, context) {
    const state = reactive({
      currentIconfont: "",
      totalWords: 0,
    });
    const handlerInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (props.showWordLimit && props.maxlength !== -1) {
        state.totalWords = target.value.length;
      }
      context.emit("update:modelValue", target.value);
    };
    const inputType = computed(() => {
      const typeAction = {
        "icon-biyan": "password",
        "icon-eye": "text",
        "": props.type,
      } as { [key: string]: string };
      return typeAction[state.currentIconfont];
    });
    const limitRender = computed(() => {
      const total = props.modelValue.length || state.totalWords;
      return (
        props.showWordLimit && (
          <span class={el["el-input-limit"]}>
            <span
              class={el["el-input-limit-inner"]}
            >{`${total} / ${props.maxlength}`}</span>
          </span>
        )
      );
    });
    onMounted(() => {
      state.currentIconfont = props.suffixIcon;
      if (props.showPassword) {
        state.currentIconfont = "icon-biyan";
      }
    });
    return {
      state,
      handlerInput,
      inputType,
      limitRender,
    };
  },
  render() {
    const { handlerInput, $props, state, inputType, limitRender,$emit } = this;
    return (
      <div class={el["el-input"]}>
        {inputType !== "textarea" ? (
          <>
            <input
              maxlength={$props.maxlength}
              type={inputType}
              readonly={$props.readonly}
              value={$props.modelValue}
              disabled={$props.disabled}
              class={el["el-input-inner"]}
              onInput={(e) => handlerInput(e)}
              onBlur={(e) => $emit('handlerBlur',e)}
              onFocus={(e) => $emit('handlerFocus',e)}
            />
            {$props.suffixIcon && (
              <span
                class={el["el-input-suffixicon"]}
                onClick={() => {
                  state.currentIconfont =
                    state.currentIconfont == "icon-biyan"
                      ? "icon-eye"
                      : "icon-biyan";
                }}
              >
                <i class={["iconfont", state.currentIconfont]}></i>
              </span>
            )}
            {limitRender}
          </>
        ) : (
          <>
            <textarea
              maxlength={$props.maxlength}
              value={$props.modelValue}
              readonly={$props.readonly}
              disabled={$props.disabled}
              onInput={(e) => handlerInput(e)}
              class={el["el-input-textarea"]}
            />
            {limitRender}
          </>
        )}
      </div>
    );
  },
});
