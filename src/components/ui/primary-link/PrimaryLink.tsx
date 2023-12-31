import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryLink.module.scss'
import './PrimaryLink.scss'

const PrimaryLink: FC<
	PropsWithChildren<{
		className?: string
		href: string
	}>
> = ({ children, className, href }) => {
	return (
		<Link
			className={`${className || ''} ${styles.primaryLink}`}
			href={href}>
			{children}
		</Link>
	)
}

export default PrimaryLink
