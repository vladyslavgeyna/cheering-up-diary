import { FC, PropsWithChildren } from 'react'
import styles from './PrimarySelect.module.scss'

const PrimarySelect: FC<
	PropsWithChildren<{
		onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
		className?: string
		value?: string
	}>
> = ({ children, onChange, className, value }) => {
	return (
		<select
			value={value}
			onChange={onChange}
			className={`${styles.select} ${className || ''}`}>
			{children}
		</select>
	)
}

export default PrimarySelect
