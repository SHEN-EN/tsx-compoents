
export interface tableColumn {
    title: string,
    scopedSlots?: string,
    sort?: boolean,
    prop: string
}
export interface tableData {
    [key: string]: string | number,
}
export interface defaultSort {
    order: string,
    prop: string,
}
