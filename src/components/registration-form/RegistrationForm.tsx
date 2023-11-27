'use client'

import styles from '@/components/create-note-form/CreateNoteForm.module.scss'
import FormError from '@/components/form-error/FormError'
import FloatInput from '@/components/ui/float-input/FloatInput'
import PrimaryButton from '@/components/ui/primary-button/PrimaryButton'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IUser } from '@/types/user.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import Loader from '../ui/loader/Loader'
import stylesRegisterForm from './RegistrationForm.module.scss'

interface IRegistrationForm extends IUser {
	confirmPassword: string
}

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.required('Username is required')
		.min(4, 'Min username length is 4')
		.max(15, 'Max username length is 15'),
	password: Yup.string()
		.required('Password is required')
		.min(5, 'Min password length is 5')
		.max(20, 'Max password length is 20'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Confirm Password is required')
		.min(5, 'Min password length is 5')
		.max(20, 'Max password length is 20'),
})

const RegistrationForm = () => {
	const router = useRouter()
	const { isLoading, error } = useTypedSelector(state => state.user)

	const { register: registerAction } = useActions()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegistrationForm>({
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	})

	if (isLoading) {
		return <Loader text='Loading...' />
	}

	const onSubmit: SubmitHandler<IRegistrationForm> = data => {
		registerAction({
			password: data.password,
			username: data.username,
		})
		router.push('/')
	}

	return (
		<>
			{error && (
				<p className={stylesRegisterForm.errorMessage}>
					Some error occured: <strong>{error}</strong>
				</p>
			)}
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

				<div className={styles.formItem}>
					<FloatInput
						label='Confrim password'
						type='text'
						register={register('confirmPassword')}
					/>
					<FormError
						className={styles.formError}
						message={errors.confirmPassword?.message}
					/>
				</div>

				<PrimaryButton type='submit'>Register</PrimaryButton>
			</form>
		</>
	)
}

export default RegistrationForm
