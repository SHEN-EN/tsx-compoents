import { defineComponent} from 'vue'
import el from '@/style/x-select.module.scss'
import Xinput from '@/components/x-input';
export default defineComponent({
    setup(){
        return{

        }
    },
    render(){
        const {$attrs} = this;
        return(
           <div class={el['el-select']}>
               <Xinput readonly={true} disabled={$attrs.disabled as boolean}></Xinput>
           </div>
        )
    }
})