import { FieldError, UseFormRegister } from 'react-hook-form'
import { RegistrationFormData } from '../components/registration-form/validation-schema/validationSchema'

export interface InputFieldProps {
	label: string
	register: UseFormRegister<RegistrationFormData>
	error?: FieldError
	name: keyof RegistrationFormData
	type?: React.HTMLInputTypeAttribute
}
