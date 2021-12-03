import { defineComponent, PropType, reactive, computed, onMounted } from 'vue'
import el from '../style/x-table.module.scss'
import { tableColumn, tableData, defaultSort } from '../type/table';
import { sortRow, deepCopy } from '../util';
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
        defaultSolt: {
            type: Object as PropType<defaultSort>,
            default: undefined
        }
    },
    setup(props, context) {
        const state = reactive({
            currentRow: {
                row: {},
                index: -1,
            },
            soltOrder: '',
            initialTableData: [] as tableData[]
        })
        state.initialTableData = deepCopy(props.tableData);
        const setCurrentRow = (index: number, item: tableData) => {
            state.currentRow.row = item;
            state.currentRow.index = index;
            context.emit('setCurrentRow', state.currentRow)
        }
        const sortChange = (prop: string) => { //@params 需要排序的对象
            const sortAction = {
                'ascending': 'descending',
                'descending': '',
                '': 'ascending'
            } as { [key: string]: string }
            state.soltOrder = sortAction[state.soltOrder]
            props.tableData.sort(sortRow(prop, state.soltOrder));
        }
        const tableData = computed(() => {
            if (!state.soltOrder) return state.initialTableData;
            return props.tableData
        })
        onMounted(() => {
            if (props?.defaultSolt) {
                state.soltOrder = props.defaultSolt.order;
                sortChange(props.defaultSolt.prop);
            }

        })
        return {
            setCurrentRow,
            sortChange,
            state,
            tableData,
        }
    },
    render() {
        const { $props, $slots, setCurrentRow, state, sortChange, tableData } = this;
        const tableBodyKey = $props.tableColumn.map(item => { return item.prop })
        const tableSlot = $props.tableColumn.map(item => { return item?.scopedSlots }).filter(item => { return item });
        const tableSort = $props.tableColumn.map(item => {
            return item?.sort && item.prop;
        }).filter(item => { return item });
        return (
            <div class={el['el-table']}>
                <div class={el['el-header']}>
                    {$props.tableColumn.map(item =>
                        <div class={[el['el-column'], tableSort.includes(item.prop) && el['is-sortable']]}
                            onClick={() => {
                                if (!tableSort.includes(item.prop)) return;
                                sortChange(item.prop)
                            }}>
                            {item.title}
                            {tableSort.map(val =>
                                val == item.prop &&
                                <span class={el['caret-wrapper']}>
                                    <i class={['iconfont', 'icon-sortdown', state.soltOrder == 'descending' && el['active']]}></i>
                                    <i class={['iconfont', 'icon-sortup', state.soltOrder == 'ascending' && el['active']]}></i>
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div class={el['el-body']} style={{ 'max-height': $props.height ? `${$props.height}px` : 'unset' }}>
                    {
                        tableData.map((item, index) =>
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