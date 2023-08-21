import { Schema, model } from 'mongoose';

const AdminWalletSchema = new Schema({
	wallet: {
		type: String,
		required: true,
		unique: true
	},
});


export default model('adminWallet', AdminWalletSchema);