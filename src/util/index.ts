import { v4 as uuidv4 } from 'uuid';
const getUId = () => {
    return uuidv4();
 }   
const sortRow = (column: string, givenOrder: string) => {
    const orderRegular = {
        'ascending': 1,
        'descending': -1,
    } as {
        [key: string]: number
    }
    const order = orderRegular[givenOrder as string];
    return function (obj_a: any, obj_b: any) {
        let reg = /[`%\s]/g;
        obj_b = String(obj_b[column]).replace(reg, ""); //避免百分比影响计算结果
        obj_a = String(obj_a[column]).replace(reg, "");
        obj_a = parseInt(obj_a) || obj_a;
        obj_b = parseInt(obj_b) || obj_b;
        if (obj_a < obj_b) {
            return order * -1;
        }
        if (obj_a > obj_b) {
            return order * 1;
        }
        return 0;
    };
}
const deepCopy = <T extends Array<T> | unknown>(sourceData: T): T => {
    if (Array.isArray(sourceData)) {
        return sourceData.map(item => deepCopy(item)) as T
    }
    const obj: T = {} as T
    for (let key in sourceData) {
        if ((typeof sourceData[key] === 'object') && sourceData[key] !== null) {
            obj[key] = deepCopy(sourceData[key])
        } else {
            obj[key] = sourceData[key]
        }
    }
    return obj
}

export {
    sortRow,
    deepCopy,
    getUId,
}