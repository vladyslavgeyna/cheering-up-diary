import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryButton.module.scss'

const PrimaryButton: FC<
	PropsWithChildren<{
		type: 'button' | 'submit' | 'reset'
		className?: string
		disabled?: boolean
		onClick?: React.MouseEventHandler<HTMLButtonElement>
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
