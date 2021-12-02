import { defineComponent, PropType, reactive } from 'vue'
import el from '../style/x-table.module.scss'
import { tableColumn, tableData } from '../type/table';
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
        stripe: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        height: {
            type: Number as PropType<number>,
            default: '',
        },
    },
    setup(props, context) {
        const state = reactive({
            currentRow: {
                row: {},
                index: Number(),
            }
        })
        const setCurrentRow = (index: number, item: tableData) => {
            state.currentRow.row = item;
            state.currentRow.index = index;
            context.emit('setCurrentRow', state.currentRow)
        }
        return {
            setCurrentRow,
            state,
        }
    },
    render() {
        const { $props, $slots, setCurrentRow, state } = this;
        const tableBodyKey = Object.keys($props.tableData[0]);
        const tableSlot = $props.tableColumn.map(item => { return item?.scopedSlots }).filter(item => { return item });
        const tableSort = $props.tableColumn.map(item => {
            return item?.sort && item.title;
        })
        return (
            <div class={el['el-table']}>
                <div class={el['el-header']}>
                    {$props.tableColumn.map(item =>
                        <div class={[el['el-column'],tableSort.includes(item.title) && el['is-sortable']]} onClick={()=>{}}>
                            {item?.title}
                            {tableSort.map(val=>
                            val == item?.title &&
                                <div class={el['caret-wrapper']}>
                                    <i class="iconfont icon-sortdown"></i>
                                    <i class="iconfont icon-sortup"></i>
                                </div>    
                            )}
                        </div>
                    )}
                </div>
                <div class={el['el-body']} style={{ 'max-height': $props.height ? `${$props.height}px` : 'unset' }}>
                    {
                        $props.tableData.map((item, index) =>
                            <div class={[el['el-row'], $props.stripe ? index % 2 === 1 && el['striped'] : '', { [el['current-row']]: index === state.currentRow.index }]} onClick={() => setCurrentRow(index, item)}>
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