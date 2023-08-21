import { FC, ReactNode, useEffect } from 'react'

interface PageProps {
	children: ReactNode
	helmet: ReactNode
}

const Page: FC<PageProps> = ({ children, helmet }) => {
	return (
		<>
			{helmet}
			{children}
		</>
	)
}

export default Page
