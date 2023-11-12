import { FieldError, UseFormRegister } from 'react-hook-form'
import { RegistrationFormData } from '../types/registration-form-data.interface'

export interface InputFieldProps {
	label: string
	register: UseFormRegister<RegistrationFormData>
	error?: FieldError
	name: keyof RegistrationFormData
	type?: React.HTMLInputTypeAttribute
}
