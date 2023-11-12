import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { RegistrationFormData } from '../../../types/registration-form-data.interface'
import styles from './InputField.module.css'

interface InputFieldProps {
	label: string
	register: UseFormRegister<RegistrationFormData>
	error?: FieldError
	name: keyof RegistrationFormData
	type?: React.HTMLInputTypeAttribute
}

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
