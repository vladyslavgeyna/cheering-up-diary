import { ISelectItem } from '@/types/select-item.interface'
import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './PrimarySelect.module.scss'
import './PrimarySelect.scss'

const PrimarySelect: FC<{
	onChange?: (value: string) => void
	className?: string
	value?: string
	required?: boolean
	defaultValue?: string
	register?: UseFormRegisterReturn<string>
	items: ISelectItem[]
	isDefaultOptionDisabled?: boolean
	isDefaultOptionNeeded?: boolean
}> = ({
	onChange,
	className,
	required = false,
	value,
	defaultValue,
	register,
	items,
	isDefaultOptionDisabled = true,
	isDefaultOptionNeeded = true,
}) => {
	return (
		<select
			required={required}
			{...(isDefaultOptionNeeded ? { defaultValue: '' } : {})}
			{...(value !== undefined ? { value: value } : {})}
			onChange={onChange && (e => onChange(e.target.value))}
			className={`${styles.select} ${className || ''}`}
			{...register}>
			{isDefaultOptionNeeded && (
				<option disabled={isDefaultOptionDisabled} value={''}>
					{defaultValue}
				</option>
			)}
			{items.map(item => (
				<option
					style={className === 'colored' ? { color: item.value } : {}}
					key={item.key}
					value={item.key}>
					{item.value}
				</option>
			))}
		</select>
	)
}

export default PrimarySelect
