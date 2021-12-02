export interface tableColumn {
    title?: string,
    scopedSlots?: string,
    sort?:boolean
}
export interface tableData {
    [key: string]: string | number,
}