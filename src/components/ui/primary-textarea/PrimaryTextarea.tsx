import { FC, PropsWithChildren } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './PrimaryTextarea.module.scss'
import './PrimaryTextarea.scss'

const PrimaryTextarea: FC<
	PropsWithChildren<{
		onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
		required?: boolean
		className?: string
		register?: UseFormRegisterReturn<string>
	}>
> = ({ onChange, required = false, className, register, children }) => {
	return (
		<>
			<textarea
				required={required}
				onChange={onChange}
				className={`${styles.primaryTextArea} ${className || ''}`}
				{...register}>
				{children}
			</textarea>
		</>
	)
}

export default PrimaryTextarea
