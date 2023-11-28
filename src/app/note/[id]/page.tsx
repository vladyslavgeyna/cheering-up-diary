'use client'

import Note from '@/components/note/Note'
import RequireAuth from '@/components/utils/RequireAuth'

type PropsType = {
	params: {
		id: string
	}
}

export default function NotePage({ params: { id } }: PropsType) {
	return (
		<RequireAuth>
			<div>
				<Note noteId={Number(id)} />
			</div>
		</RequireAuth>
	)
}
