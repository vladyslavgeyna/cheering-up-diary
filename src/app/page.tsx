import HomePage from '@/components/home-page/HomePage'
import RequireAuth from '@/components/utils/RequireAuth'

export default function Home() {
	return (
		<RequireAuth>
			<HomePage />
		</RequireAuth>
	)
}
