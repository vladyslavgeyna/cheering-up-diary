import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from '../registration-form/RegistrationForm.module.css'
import InputField from './input-field/InputField'
import {
	RegistrationFormData,
	validationSchema,
} from './validation-schema/validationSchema'

const RegistrationForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationFormData>({
		resolver: yupResolver(validationSchema),
	})

	const onSubmit = (data: RegistrationFormData) => {
		console.log(data)
	}

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label='Full Name'
					register={register}
					error={errors.fullName}
					name='fullName'
				/>
				<InputField
					label='Email'
					register={register}
					error={errors.email}
					name='email'
					type='email'
				/>
				<InputField
					label='Age'
					register={register}
					error={errors.age}
					name='age'
					type='number'
				/>
				<InputField
					label='Date of Birth'
					register={register}
					error={errors.dateOfBirth}
					name='dateOfBirth'
					type='date'
				/>
				<InputField
					label='Password'
					register={register}
					error={errors.password}
					name='password'
					type='password'
				/>
				<InputField
					label='Confirm Password'
					register={register}
					error={errors.confirmPassword}
					name='confirmPassword'
					type='password'
				/>

				<input type='submit' className={styles.submitButton} />
			</form>
		</div>
	)
}

export default RegistrationForm
