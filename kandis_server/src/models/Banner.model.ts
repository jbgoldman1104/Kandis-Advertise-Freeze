import { Schema, model } from 'mongoose';

const BannerSchema = new Schema({
	imageURL: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	websiteLink: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	timeLive: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		default: 'admin'
	},
	expireAt: {
		type: Date
	}
});

BannerSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default model('Banner', BannerSchema);
