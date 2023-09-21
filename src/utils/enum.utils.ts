import { ISelectItem } from '@/types/select-item.interface'

/**
 *
 * @param value value you want to check if enum has it
 * @param enumType type of enum you want to check if it has the value
 * @returns true if given enum has given value, otherwise false
 */
export function hasEnumValue(value: number, enumType: object) {
	if (!(value in enumType)) {
		return false
	}
	return true
}

/**
 *
 * @param enumType type of enum you want to get max value of
 * @returns max value of given enum type
 */
export function getEnumMaxValue(enumType: object) {
	const values = Object.keys(enumType)
		.map(k => (k === '' ? NaN : +k))
		.filter(k => !isNaN(k))
	return Math.max(...values)
}

/**
 *
 * @param enumType type of enum you want to get min value of
 * @returns min value of given enum type
 */
export function getEnumMinValue(enumType: object) {
	const values = Object.keys(enumType)
		.map(k => (k === '' ? NaN : +k))
		.filter(k => !isNaN(k))
	return Math.min(...values)
}

/**
 *
 * @param enumType type of enum you want to convert into array of ISelectItem
 * @returns array of ISelectItem of given enum type
 */
export function getEnumAsISelectItemArray(enumType: any) {
	try {
		const values: ISelectItem[] = []
		const maxEnumValue = getEnumMaxValue(enumType)
		const minEnumValue = getEnumMinValue(enumType)
		for (let i = minEnumValue; i <= maxEnumValue; i++) {
			values.push({
				value: enumType[i],
				key: i.toString(),
			})
		}
		return values
	} catch (error) {
		console.log('Error occurred while getting items')
		return []
	}
}
