import { FC } from 'react'
import styles from './PrimaryInput.module.scss'

const PrimaryInput: FC<{
	type?: React.HTMLInputTypeAttribute | undefined
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
	value?: string | number | readonly string[] | undefined
	required?: boolean | undefined
	className?: string | undefined
	placeholder?: string | undefined
}> = ({ type, onChange, value, required = false, className, placeholder }) => {
	return (
		<>
			<input
				required={required}
				value={value}
				onChange={onChange}
				className={`${styles.input} ${className || ''}`}
				type={type}
				placeholder={placeholder}
			/>
		</>
	)
}

export default PrimaryInput
