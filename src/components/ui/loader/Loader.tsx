import { FC, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './BarLoader.module.scss'

const Loader: FC<{ text: string }> = ({ text }) => {
	const [isEnter, setIsEnter] = useState(true)
	useEffect(() => {
		return () => {
			setIsEnter(false)
		}
	}, [])

	return (
		<CSSTransition
			in={isEnter}
			timeout={1000}
			appear={true}
			classNames={'disappearLoader'}>
			<div className={styles.spinnerContainer}>
				<svg
					width='87'
					height='50'
					viewBox='0 0 87 50'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<g className={styles.loader_bars}>
						<g className={styles.upperbar}>
							<rect
								className={styles.one_two}
								id='1_2'
								width='67'
								height='14'
								rx='7'
								fill='rgb(112, 44, 249)'
							/>
						</g>
						<g className={styles.middlebar}>
							<rect
								className={styles.rec_2}
								x='20'
								y='18'
								width='67'
								height='14'
								rx='7'
								fill='rgb(96, 17, 255)'
							/>
						</g>
						<g className={styles.bottombar}>
							<rect
								className={styles.three_two}
								id='3_2'
								y='36'
								width='67'
								height='14'
								rx='7'
								fill='rgb(69, 9, 208)'
							/>
						</g>
					</g>
				</svg>
				<p className={styles.text}>{text}</p>
			</div>
		</CSSTransition>
	)
}

export default Loader
