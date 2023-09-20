import { FC, PropsWithChildren } from 'react'
import styles from './Container.module.scss'

const Container: FC<PropsWithChildren<{ style?: React.CSSProperties }>> = ({
	children,
	style,
}) => {
	return (
		<div style={style} className={styles.container}>
			{children}
		</div>
	)
}

export default Container
