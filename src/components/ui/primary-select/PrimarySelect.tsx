import { ISelectItem } from '@/types/select-item.interface'
import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './PrimarySelect.module.scss'

const PrimarySelect: FC<{
	onChange?: (value: string) => void
	className?: string
	value?: string
	required?: boolean
	defaultValue: string
	register?: UseFormRegisterReturn<string>
	items: ISelectItem[]
	isDefaultOptionDisabled?: boolean
}> = ({
	onChange,
	className,
	required = false,
	value,
	defaultValue,
	register,
	items,
	isDefaultOptionDisabled = true,
}) => {
	return (
		<select
			required={required}
			value={value}
			onChange={onChange && (e => onChange(e.target.value))}
			className={`${styles.select} ${className || ''}`}
			{...register}>
			<option disabled={isDefaultOptionDisabled} value=''>
				{defaultValue}
			</option>
			{items.map(item => (
				<option key={item.key} value={item.key}>
					{item.value}
				</option>
			))}
		</select>
	)
}

export default PrimarySelect
