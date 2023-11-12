import * as yup from 'yup'

export const validationSchema = yup.object({
	fullName: yup
		.string()
		.required('Full name is required')
		.min(5, 'Full name must be at least 5 characters'),
	email: yup.string().email('Invalid email').required('Email is required'),
	age: yup
		.number()
		.positive('Age must be a positive number')
		.integer('Age must be an integer')
		.required('Age is required'),
	dateOfBirth: yup.date().max(new Date(), 'You cannot be born in the future'),
	password: yup.string().min(6, 'Password must be at least 6 characters'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), undefined], 'Passwords must match'),
})
