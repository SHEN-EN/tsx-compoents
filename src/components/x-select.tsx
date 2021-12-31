import { defineComponent, reactive, onMounted, PropType, computed } from "vue";
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
        modelValue: {
            type: String as PropType<string>,
            default: ''
        },
        multiple: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup(props, context) {
        const state = reactive({
            isChange: false,
            currentItem: {} as option,
            multipleItem: [] as option[],
        });
        const visibleChange = () => {
            state.isChange = !state.isChange;
            context.emit("visible-change", state.isChange);
        };
        const change = (item: option) => {
            state.currentItem.push(item);
            context.emit("update:modelValue", item.label);
            context.emit("change", item);
        };
        const handlerOther = () => {
            state.isChange = false;
        };
        const multipleChange = (item: option) => {
            state.multipleItem.push(item);
        }
        const renderClass = (item: option) => {
            !props.multiple ?
                item.value == state.currentItem.value && el['selected'] : state.multipleItem.map(item => item.value).includes(item.value)
        }
        onMounted(() => {
            if (props.modelValue.constructor == String && !props.multiple) {
                let currentValue = props.options.find(item => {
                    return item.label == props.modelValue
                })?.value
                state.currentItem.label = props.modelValue;
                if (currentValue) state.currentItem.value = currentValue;
            }
            if (props.multiple) {

            }
        });
        return {
            visibleChange,
            change,
            multipleChange,
            renderClass,
            state,
        };
    },
    render() {
        const { $attrs, visibleChange, state, $props, change, multipleChange, renderClass } = this;
        const value = $props.modelValue.constructor == String ? $props.modelValue : $props.modelValue.join(',')
        return (
            <div class={el["el-select"]} onClick={visibleChange}>
                <Xinput
                    reversal={state.isChange}
                    suffixIcon="icon-arrow-down"
                    readonly={true}
                    disabled={$attrs.disabled as boolean}
                    selectCompoents={true}
                    v-model={$props.modelValue}
                ></Xinput>
                <Xtransition>
                    {$props.options.length && state.isChange && (
                        <>
                            <ul class={el["el-select-dropdown"]}>
                                {$props.options.map((item, index) => {
                                    return (
                                        <li
                                            class={[el["el-select-dropdown-item"],
                                            renderClass(item),
                                            item.disabled && el['is-disabled']]}
                                            key={index}
                                            onClick={() => !$props.multiple ? change(item) : multipleChange(item)}
                                        >
                                            {item.label}
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </Xtransition>
            </div>
        );
    },
});
