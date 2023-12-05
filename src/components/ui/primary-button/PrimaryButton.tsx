import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryButton.module.scss'
import './PrimaryButton.scss'

const PrimaryButton: FC<
	PropsWithChildren<{
		type: 'button' | 'submit' | 'reset'
		className?: string
		disabled?: boolean
		onClick?: React.MouseEventHandler<HTMLButtonElement>
		buttonRef?: React.LegacyRef<HTMLButtonElement>
	}>
> = ({ type, children, className, onClick, buttonRef, disabled = false }) => {
	return (
		<button
			ref={buttonRef}
			onClick={onClick}
			disabled={disabled}
			className={`${className || ''} ${styles.button}`}
			type={type}>
			{children}
		</button>
	)
}

export default PrimaryButton
