import { defineComponent, PropType } from "vue";
import el from "@/style/x-tags.module.scss";
export default defineComponent({
    props: {
        closable: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        bgColor: {
            type: String as PropType<string>,
            default: '#ecf5ff'
        }
    },
    setup(props, context) {
        const handlerClose = () => {
            context.emit('handlerClose')
        }
        return {
            handlerClose,
        }
    },
    render() {
        const { $props, $slots, handlerClose } = this;
        return (
            <div class={el['el-tags']} style={{ 'background': $props.bgColor }}>
                {$slots.default?.()}
                <i class={[el['el-tags-icon'], "iconfont icon-close"]} onClick={handlerClose}></i>
            </div>
        )
    }
})