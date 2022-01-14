import { defineComponent, reactive, watchEffect } from "vue";
import Xselect from "@/components/x-select";

export default defineComponent({
    setup() {
        const state = reactive({
            options: [
                {
                    label: "13",
                    value: 1,
                },
                {
                    label: "234",
                    value: 2,
                },
                {
                    label: "1233",
                    value: 3,
                },
            ],
            value: ['13','234']
        });
        watchEffect(() => {
            console.log(state.value)
        })
        return {
            state,
        };
    },
    render() {
        const { state } = this;
        return <Xselect v-model={[state.value, ['value']]} disabled={false} options={state.options}></Xselect>;
    },
});
