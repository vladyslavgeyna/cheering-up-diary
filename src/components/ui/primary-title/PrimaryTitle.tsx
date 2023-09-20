import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryTitle.module.scss'

const PrimaryTitle: FC<
	PropsWithChildren<{
		className?: string
	}>
> = ({ children, className }) => {
	return <h1 className={`${className || ''} ${styles.title}`}>{children}</h1>
}

export default PrimaryTitle
