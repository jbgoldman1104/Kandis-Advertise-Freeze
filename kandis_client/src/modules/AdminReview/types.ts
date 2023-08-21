export interface IBannerPost {
	imageURL: string;
	description: string;
	websiteLink: string;
	email: string;
	timeLive: number
}

export interface IBannerPut {
	description: string;
	websiteLink: string;
	email: string;
	bannerId: string
}