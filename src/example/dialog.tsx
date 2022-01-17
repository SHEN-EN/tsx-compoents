import { defineComponent } from "vue";
import Xdialog from "@/components/x-dialog";

export default defineComponent({
    setup() {
        return {

        };
    },
    render() {
        return (
            <Xdialog v-slots={{
                footer: () => {
                    return (
                        123
                    )
                }
            }}>
                123
            </Xdialog>
        )
    },
});
