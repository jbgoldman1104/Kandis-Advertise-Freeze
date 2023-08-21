import jwt from 'jsonwebtoken'

export const generateToken = (walletAddress: string) => {
	const ACCESS_TOKEN = `${process.env.ACCESS_TOKEN}`

	const payload = {
		walletAddress
	}

	return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '10d' });
}