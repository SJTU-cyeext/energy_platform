
const formatNumberToThousands = (num: number): string => {
    if (isNaN(num)) {
        throw new Error("必须是一个有效的数字")
    }
    let formattedNumber = ''


    let [intPart, decimalPart] = num.toString().split('.')

    // ??为空值合并运算符 左侧为 null 或 undefined 时才使用右侧
    intPart = intPart ?? ''  // 确保intPart不是undefine

    for (let i = intPart.length - 1; i >= 0; i--) {
        formattedNumber = intPart[i] + formattedNumber
        if ((intPart?.length - i) % 3 === 0 && i != 0) {
            formattedNumber = ',' + formattedNumber
        }
    }
    return decimalPart ? `${formattedNumber}.${decimalPart}` : formattedNumber
}

export default formatNumberToThousands