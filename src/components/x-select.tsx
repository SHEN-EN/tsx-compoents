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
            type: [String, Array] as PropType<string | string[]>,
            default: ''
        },
        multiple: {
            type: Boolean as PropType<boolean>,
            default: true
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
            state.currentItem = item;
            context.emit("update:modelValue", item.label);
            context.emit("change", item);
        };
        const handlerOther = () => {
            state.isChange = false;
        };
        const multipleChange = (item: option, index: number) => {
            state.multipleItem.map(item => item.value).includes(item.value) ? state.multipleItem.splice(index, 1) : state.multipleItem.push(item);
            const returnLabel = state.multipleItem.map(item => item.label)
            context.emit("update:modelValue", returnLabel);
            context.emit("change", returnLabel);
        }
        const renderClass = (item: option) => {
            if (!props.multiple ?
                item.value == state.currentItem.value : state.multipleItem.map(item => item.value).includes(item.value)) {
                return el['selected']
            }
        }
        const computedValue = computed(() => {
            return props.modelValue.constructor == String ? props.modelValue : (props.modelValue as string[]).join(',')
        })
        onMounted(() => {
            let currentValue = null
            if (props.modelValue.constructor == String && !props.multiple) {
                let currentValue = null
                currentValue = props.options.find(item => {
                    return item.label == props.modelValue
                })?.value
                state.currentItem.label = props.modelValue;
                if (currentValue) state.currentItem.value = currentValue;
            } else {
                currentValue = props.options.filter(item => {
                    return props.modelValue.includes(item.label)
                })
                state.multipleItem.push(...currentValue);
            }
        });
        return {
            visibleChange,
            change,
            multipleChange,
            renderClass,
            state,
            computedValue,
        };
    },
    render() {
        const { $attrs, visibleChange, state, $props, change, multipleChange, renderClass, computedValue } = this;
        return (
            <div class={el["el-select"]} onClick={visibleChange}>
                <Xinput
                    reversal={state.isChange}
                    suffixIcon="icon-arrow-down"
                    readonly={true}
                    disabled={$attrs.disabled as boolean}
                    selectCompoents={true}
                    v-model={computedValue}
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
                                            onClick={() => !$props.multiple ? change(item) : multipleChange(item, index)}
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
