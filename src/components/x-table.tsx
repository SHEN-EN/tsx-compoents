import { defineComponent, PropType, reactive, computed, onMounted } from "vue";
import el from "@/style/x-table.module.scss";
import { tableColumn, tableData, defaultSort } from "@/type/table";
import { sortRow, deepCopy } from "@/util";
import Xcheckbox from "@/components/x-checkbox";
export default defineComponent({
  props: {
    tableData: {
      type: Object as PropType<tableData[]>,
      default: [],
    },
    tableColumn: {
      type: Object as PropType<tableColumn[]>,
      default: [],
    },
    stripe: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    height: {
      type: Number as PropType<number>,
      default: "",
    },
    defaultSolt: {
      type: Object as PropType<defaultSort>,
      default: undefined,
    },
    selection: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, context) {
    const state = reactive({
      currentRow: {
        row: {},
        index: -1,
      },
      soltOrder: {
        order: "",
        prop: "",
      } as defaultSort,
      initialTableData: [] as tableData[],
      selectedRow: [] as tableData[],
    });
    state.initialTableData = deepCopy(props.tableData);
    const setCurrentRow = (index: number, item: tableData) => {
      state.currentRow.row = index === state.currentRow.index ? {} : item;
      state.currentRow.index = index === state.currentRow.index ? -1 : index;
      context.emit("setCurrentRow", state.currentRow);
    };
    const sortChange = (prop: string) => {
      //@params 需要排序的对象
      const sortAction = {
        ascending: "descending",
        descending: "",
        "": "ascending",
      } as { [key: string]: string };
      if (prop !== state.soltOrder.prop) {
        state.soltOrder.prop = "";
        state.soltOrder.order = "";
      }
      state.soltOrder.prop = prop;
      state.soltOrder.order = sortAction[state.soltOrder.order];
      props.tableData.sort(sortRow(prop, state.soltOrder.order));
    };
    const selectAll = (checked: boolean, value: string) => {
      if (!checked) {
        state.selectedRow = [];
        return;
      }
      for (const iterator of state.initialTableData) {
        state.selectedRow.push(iterator);
      }
    };
    const selectCurrentRow = (
      checked: boolean,
      value: string,
      item: tableData,
      index: number
    ) => {
      if (checked) {
        state.selectedRow.push(item);
      } else {
      }
    };
    const tableData = computed(() => {
      if (!state.soltOrder.order) return state.initialTableData;
      return props.tableData;
    });
    const isselectedAll = computed((): boolean => {
      const tableColumnLength = props.tableData.length;
      return tableColumnLength === state.selectedRow.length;
    });
    onMounted(() => {
      if (props?.defaultSolt) {
        state.soltOrder.order = props.defaultSolt.order;
        sortChange(props.defaultSolt.prop);
      }
    });
    return {
      setCurrentRow,
      sortChange,
      state,
      tableData,
      selectAll,
      isselectedAll,
      selectCurrentRow,
    };
  },
  render() {
    const {
      $props,
      $slots,
      setCurrentRow,
      state,
      sortChange,
      tableData,
      selectAll,
      isselectedAll,
      selectCurrentRow,
    } = this;
    const tableBodyKey = $props.tableColumn.map((item) => {
      return item.prop;
    });
    const tableSlot = $props.tableColumn
      .map((item) => {
        return item?.scopedSlots;
      })
      .filter((item) => {
        return item;
      });
    const tableSort = $props.tableColumn
      .map((item) => {
        return item?.sort && item.prop;
      })
      .filter((item) => {
        return item;
      });
    return (
      <div class={el["el-table"]}>
        <div class={el["el-header"]}>
          <div class={[el["el-column"], el["is_selection"]]}>
            <Xcheckbox
              v-model={[state.selectedRow.length, "checked"]}
              indeterminate={!isselectedAll}
              onHandlerChange={(checked: boolean, value: string) =>
                selectAll(checked, value)
              }
            ></Xcheckbox>
          </div>
          {$props.tableColumn.map((item) => (
            <div
              class={[
                el["el-column"],
                tableSort.includes(item.prop) && el["is-sortable"],
              ]}
              onClick={() => {
                if (!tableSort.includes(item.prop)) return;
                sortChange(item.prop);
              }}
            >
              {item.title}
              {tableSort.map(
                (val) =>
                  val == item.prop && (
                    <span class={el["caret-wrapper"]}>
                      <i
                        class={[
                          "iconfont",
                          "icon-sortdown",
                          state.soltOrder.prop == val &&
                            state.soltOrder.order == "descending" &&
                            el["active"],
                        ]}
                      ></i>
                      <i
                        class={[
                          "iconfont",
                          "icon-sortup",
                          state.soltOrder.prop == val &&
                            state.soltOrder.order == "ascending" &&
                            el["active"],
                        ]}
                      ></i>
                    </span>
                  )
              )}
            </div>
          ))}
        </div>
        <div
          class={el["el-body"]}
          style={{
            "max-height": $props.height ? `${$props.height}px` : "unset",
          }}
        >
          {tableData.map((item, index) => (
            <div
              class={[
                el["el-row"],
                $props.stripe ? index % 2 === 1 && el["striped"] : "",
                { [el["current-row"]]: index === state.currentRow.index },
              ]}
              onClick={() => setCurrentRow(index, item)}
            >
              <div class={[el["el-row-cell"], el["is_selection"]]}>
                <Xcheckbox
                  onHandlerChange={(
                    checked: boolean,
                    value: string,
                    item: tableData,
                    index: number
                  ) => selectCurrentRow(checked, value, item, index)}
                ></Xcheckbox>
              </div>
              {tableBodyKey.map((val) => (
                <div class={el["el-row-cell"]}>
                  {!tableSlot.includes(val)
                    ? item[val]
                    : tableSlot.map((slotVal) =>
                        $slots[slotVal as string]?.(item[val])
                      )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
