import Container from '@/components/layout/container/Container'
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import ReduxProvider from '@/store/ReduxProvider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '../assets/styles/global.scss'

const nunito = Nunito({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
	title: 'Cheering up diary',
	description: 'Cheering up diary',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<ReduxProvider>
					<div className='wrapper'>
						<Header />
						<main className='main'>
							<Container>{children}</Container>
						</main>
						<Footer />
					</div>
				</ReduxProvider>
			</body>
		</html>
	)
}
