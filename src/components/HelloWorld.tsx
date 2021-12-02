import { defineComponent, reactive } from 'vue';
import Xtable from './x-table';
export default defineComponent({
  setup() {
    const state = reactive({
      tableData: [
        {
          name:"123",
          address:'row1'
        },
        {
          name:"1234",
          address:'row2'
        },
        {
          name:"123",
          address:'row1'
        },
        {
          name:"1234",
          address:'row2'
        }
      ],
      tableColumn: [
        {
          title: 'Name',
          scopedSlots: 'name',
          sort:true,
        },
        {
          title: 'Address',
        }
      ]
    })
    const setCurrentRow = (item:object)=>{
        
    }
    return {
      state,
      setCurrentRow
    }
  },
  render() {
    const { state,setCurrentRow } = this;
    return (
      <div class="render-component">
        <Xtable onSetCurrentRow={(item:object)=>setCurrentRow(item)} tableData={state.tableData} tableColumn={state.tableColumn} v-slots={{
          name: (props:any) => {
            return(
              <div>{props}</div>
            )
          }
        }}>
        </Xtable>
      </div>
    )
  }
})