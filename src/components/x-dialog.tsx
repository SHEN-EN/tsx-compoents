import { defineComponent, PropType, ref } from "vue";
import el from "@/style/x-dialog.module.scss"
export default defineComponent({
    props: {
        title: {
            type: String as PropType<string>,
            default: '234',
        },
        visible: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        customClass: {
            type: String as PropType<string>,
            default: ''
        },
        width: {
            type: String as PropType<string>,
            default: '50%'
        },
        showClose: {
            type: Boolean as PropType<boolean>,
            default: true
        }
    },
    setup(props, context) {
        const dialogState = ref(false);
        dialogState.value = props.visible;
        const handlerClose = () => {
            dialogState.value = false;
            context.emit("close")
        }
        return {
            handlerClose,
            dialogState
        }
    },
    render() {
        const { $props, $slots, handlerClose, dialogState } = this;
        return (
            <>
                {dialogState &&
                    (
                        <div class={[el['el-dialog'], $props.customClass]} style={{ 'width': $props.width }}>
                            <div class={el['el-dialog-header']}>
                                {$props.title}
                                {$props.showClose && <div class={el['el-dialog-header-close']} onClick={() => { handlerClose }}>
                                    <i class="iconfont icon-close"></i>
                                </div>}
                            </div>
                            <div class={el['el-dialog-body']}>
                                {$slots.default?.()}
                            </div>
                            <div class={el['el-dialog-footer']}>
                                {$slots.footer?.()}
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
})
