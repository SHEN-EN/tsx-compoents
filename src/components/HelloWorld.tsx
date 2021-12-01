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
        }
      ],
      tableColumn: [
        {
          title: 'Name',
          scopedSlots: 'name',
        },
        {
          title: 'Address',
        }
      ]
    })
    return {
      state
    }
  },
  render() {
    const { state } = this
    return (
      <div class="render-component">
        <Xtable tableData={state.tableData} tableColumn={state.tableColumn} v-slots={{
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