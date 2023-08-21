export 	interface IBanner {
	_id: string
	image?: any
	imageURL: string
	description: string
	websiteLink: string
	email: string
	timeLive: number
	bannerChecked?: boolean
	status: 'admin' | 'production'
}