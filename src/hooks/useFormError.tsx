import FormError from '@/components/form-error/FormError'
import { useState } from 'react'

const useFormError = () => {
	const [isError, setIsError] = useState(false)

	const [isErrorMessage, setIsErrorMessage] = useState('')

	const setError = (error: boolean) => {
		setIsError(error)
	}

	const setErrorMessage = (errorMessage: string) => {
		setIsErrorMessage(errorMessage)
	}

	const getErrorComponent = () => {
		return isError ? <FormError message={isErrorMessage} /> : null
	}

	return { getErrorComponent, setError, setErrorMessage }
}

export default useFormError
