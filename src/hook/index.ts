import { getCurrentInstance } from 'vue';
const useCurrentEl = () => {
    const {ctx} = getCurrentInstance() as any;
    return{
        ctx
    }
}
export{
    useCurrentEl
}