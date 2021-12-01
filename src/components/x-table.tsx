import { defineComponent, PropType } from 'vue'
import el from '../style/x-table.module.scss'
import { tableColumn, tableData } from '../type/index';
export default defineComponent({
    props: {
        tableData: {
            type: Object as PropType<tableData[]>,
            default: []
        },
        tableColumn: {
            type: Object as PropType<tableColumn[]>,
            default: []
        },
        border: {
            type: Boolean as PropType<boolean>,
            default: false,
        }
    },
    setup(props) {

    },
    render() {
        const { $props, $slots } = this;
        const tableBodyKey = Object.keys($props.tableData[0]);
        const tableSlot = $props.tableColumn.map(item => { return item?.scopedSlots }).filter(item => { return item })
        return (
            <div class={el['el-table']}>
                <div class={el['el-header']}>
                    {$props.tableColumn.map(item =>
                        <div class={el['el-column']}>{item?.title}</div>
                    )}
                </div>
                <div class={el['el-body']}>
                    {
                        $props.tableData.map(item =>
                            <div class={el['el-row']}>
                                {tableBodyKey.map(val =>
                                    <div class={el['el-row-cell']}>
                                        {!tableSlot.includes(val) ? item[val] : tableSlot.map(slotVal => $slots[slotVal as string]?.(item[val]))}
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
})