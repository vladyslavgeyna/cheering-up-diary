import React from 'react'
import { InputFieldProps } from '../../../types/input-field.interface'
import styles from './InputField.module.css'

const InputField: React.FC<InputFieldProps> = ({
	label,
	register,
	error,
	name,
	type = 'text',
}) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<input className={styles.input} type={type} {...register(name)} />
			{error && <p className={styles.error}>{error.message}</p>}
		</div>
	)
}

export default InputField
