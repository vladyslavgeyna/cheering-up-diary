'use client'

import styles from '@/components/create-note-form/CreateNoteForm.module.scss'
import FormError from '@/components/form-error/FormError'
import FloatInput from '@/components/ui/float-input/FloatInput'
import PrimaryButton from '@/components/ui/primary-button/PrimaryButton'
import { IUser } from '@/types/user.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.required('Username is required')
		.min(4, 'Min username length is 4')
		.max(15, 'Max username length is 15'),
	password: Yup.string()
		.required('Password is required')
		.min(5, 'Min password length is 5')
		.max(20, 'Max password length is 20'),
})

const LoginFormComponent = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUser>({
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	})

	const onSubmit: SubmitHandler<IUser> = data => {
		console.log(data)
		// Тут ваша логіка відправки даних
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
			method='post'>
			<div className={styles.formItem}>
				<FloatInput
					label='Username'
					type='text'
					register={register('username')}
				/>
				<FormError
					className={styles.formError}
					message={errors.username?.message}
				/>
			</div>
			<div className={styles.formItem}>
				<FloatInput
					label='Password'
					type='text'
					register={register('password')}
				/>
				<FormError
					className={styles.formError}
					message={errors.password?.message}
				/>
			</div>

			<PrimaryButton type='submit'>Sign in</PrimaryButton>
		</form>
	)
}

export default LoginFormComponent
