import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryButton.module.scss'

const PrimaryButton: FC<
	PropsWithChildren<{
		type?: 'button' | 'submit' | 'reset' | undefined
		className?: string | undefined
		disabled?: boolean | undefined
		onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
	}>
> = ({ type, children, className, onClick, disabled = false }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${className || ''} ${styles.button}`}
			type={type}>
			{children}
		</button>
	)
}

export default PrimaryButton
