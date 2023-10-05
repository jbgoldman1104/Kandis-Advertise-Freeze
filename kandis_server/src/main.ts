import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/index.js';
dotenv.config();

/* Application initialization */
const app: Express = express();

/* Constants */
const PORT = process.env.PORT || 3000;
const DATABASE_URL = `${process.env.DATABASE_URL}`;
const CORS_URL = `${process.env.CORS_URL}`;

/*  Middlewares */
app.use('api/static', express.static('static'));
app.use(
	cors({
		origin: '*' //https://kandisprotocol.com
	})
);
app.use(express.json());

/* Routes */
app.use('/api', router);

/* Start Function */
const start = (): void => {
	try {
		/* Database connection */
		mongoose
			.connect(DATABASE_URL)
			.then(res => {
				if (res) {
					console.log('Connect to MongoDB!');
				}
			})
			.catch(err => {
				if (err) {
					console.log(err);
					console.log('DB error!');
				}
			});

		/* Start Server */
		app.listen(PORT, () => {
			console.log(`Server is Active, URL - http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(`Server crashed - ${error}`);
	}
};

start();
