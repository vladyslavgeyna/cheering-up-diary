import { ISelectItem } from '@/types/select-item.interface'
import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './PrimarySelect.module.scss'

const PrimarySelect: FC<{
	onChange?: React.ChangeEventHandler<HTMLSelectElement>
	className?: string
	value?: string
	required?: boolean
	defaultValue: string
	register?: UseFormRegisterReturn<string>
	items: ISelectItem[]
}> = ({
	onChange,
	className,
	required = false,
	value,
	defaultValue,
	register,
	items,
}) => {
	return (
		<select
			defaultValue={''}
			required={required}
			value={value}
			onChange={onChange}
			className={`${styles.select} ${className || ''}`}
			{...register}>
			<option disabled value=''>
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
