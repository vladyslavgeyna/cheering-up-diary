import { FC } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './FloatInput.module.scss'
import './FloatInput.scss'

const FloatInput: FC<{
	label: string
	type: React.HTMLInputTypeAttribute
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	value?: string | number | readonly string[]
	required?: boolean | undefined
	className?: string | undefined
	register?: UseFormRegisterReturn<string>
}> = ({ label, type, onChange, value, required, className, register }) => {
	return (
		<>
			<div className={styles.wrapper}>
				<input
					required={required}
					value={value}
					onChange={onChange}
					className={`${styles.floatInput} ${className || ''}`}
					type={type}
					placeholder=' '
					{...register}
				/>
				<label className={styles.labelFloatInput}>{label}</label>
			</div>
		</>
	)
}

export default FloatInput
