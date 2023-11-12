import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form'

export interface InputFieldProps {
	label: string
	register: UseFormRegister<FieldValues>
	error?: FieldError | null
	name: string
	type?: React.HTMLInputTypeAttribute
}
