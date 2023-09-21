import { FC } from 'react'
import styles from './PrimaryTextarea.module.scss'

const PrimaryTextarea: FC<{
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
	value?: string | number | readonly string[] | undefined
	required?: boolean | undefined
	className?: string | undefined
	placeholder?: string | undefined
}> = ({ onChange, value, required = false, className, placeholder }) => {
	return (
		<>
			<textarea
				required={required}
				value={value}
				onChange={onChange}
				className={`${styles.textArea} ${className || ''}`}
				placeholder={placeholder}></textarea>
		</>
	)
}

export default PrimaryTextarea
