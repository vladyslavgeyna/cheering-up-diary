import { FC } from 'react'
import styles from './FormError.module.scss'

const FormError: FC<{ message?: string; className?: string }> = ({
	message,
	className,
}) => {
	return (
		message && (
			<p className={`${styles.error} ${className || ''}`}>{message}</p>
		)
	)
}

export default FormError
