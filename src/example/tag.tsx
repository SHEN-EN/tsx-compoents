import { defineComponent, reactive } from "vue";
import Xtag from "@/components/x-tag";
export default defineComponent({
    setup() {
        const state = reactive({
           
        });
        return {
            state,
        };
    },
    render() {
        const { state } = this;
        return <Xtag>123</Xtag>;
    },
});
