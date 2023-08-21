import cache from 'memory-cache';
import { Request, Response, NextFunction } from 'express';

interface CacheResponse extends Response {
	sendResponse?: Response['send'];
}

export function cacheMiddleware(duration: number) {
	return (req: Request, res: CacheResponse, next: NextFunction) => {
		const key = '__express__' + req.originalUrl || req.url;
		const cachedData = cache.get(key);

		if (cachedData) {
			res.send(cachedData);
			return;
		} else {
			res.sendResponse = res.send;

			// @ts-ignore
			res.send = (body: any) => {
				cache.put(key, body, duration * 1000);
				if (res.sendResponse) {
					res.sendResponse(body);
				}
			};

			next();
		}
	};
}
