import { InternalAxiosRequestConfig } from '.';

interface IMocksDictionary {
	[key: string]: any;
};

const mocks: IMocksDictionary = {
	'[get]:[http://localhost:3001/type-viewing]': {
		data: [
			"movie",
			"cartoon",
			"series",
			"animated_series",
			"anime",
			"anime_series"
		]
	},
	'[get]:[http://localhost:3001/watch-list]': {
		data: [
			{
				"id": "1676850018403",
				"name": "Абстракция",
				"is-franchise": false,
				"type-viewing": "series"
			},
			{
				"id": "1677390343862",
				"name": "Достать ножи: Стеклянная луковица",
				"is-franchise": false,
				"type-viewing": "movie"
			},
		]
	},
};

export function mockingData(config: InternalAxiosRequestConfig) {
    return new Promise(resolve => {
		const key: string = `[${config.method}]:[${config.baseURL}${config.url}]`;
		let data;

		if (mocks[key]) {
			data = mocks[key];
		}

		resolve(data);
    });
}