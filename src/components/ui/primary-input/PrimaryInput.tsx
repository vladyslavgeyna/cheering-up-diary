import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './PrimaryInput.module.scss'

const PrimaryInput: FC<{
	type: React.HTMLInputTypeAttribute
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	value?: string | number | readonly string[]
	required?: boolean
	className?: string
	placeholder?: string
	register?: UseFormRegisterReturn<string>
}> = ({
	type,
	onChange,
	value,
	register,
	required = false,
	className,
	placeholder,
}) => {
	return (
		<>
			<input
				required={required}
				value={value}
				onChange={onChange}
				className={`${styles.input} ${className || ''}`}
				type={type}
				placeholder={placeholder}
				{...register}
			/>
		</>
	)
}

export default PrimaryInput
