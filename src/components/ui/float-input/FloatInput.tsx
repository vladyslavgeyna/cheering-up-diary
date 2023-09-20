import { FC } from 'react'
import styles from './FloatInput.module.scss'

const FloatInput: FC<{
	label: string
	type: React.HTMLInputTypeAttribute | undefined
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
	value: string | number | readonly string[] | undefined
	required: boolean | undefined
	className: string | undefined
}> = ({ label, type, onChange, value, required, className }) => {
	return (
		<>
			<div className={styles.wrapper}>
				<input
					required={required}
					value={value}
					onChange={onChange}
					className={`${styles.input} ${className || ''}`}
					type={type}
					placeholder=' '
				/>
				<label className={styles.label}>{label}</label>
			</div>
		</>
	)
}

export default FloatInput
