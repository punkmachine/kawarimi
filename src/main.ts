import { AxiosInstance, AxiosResponse } from '.';

interface IMocksDictionary {
	[key: string]: any;
};

interface Kawarimi {
	instance: AxiosInstance
}

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

class Kawarimi {
	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	mocker() {
		this.instance.interceptors.response.use(async (response: AxiosResponse) => {
			let data: AxiosResponse = JSON.parse(JSON.stringify(response));
			const key: string = `[${response.config.method}]:[${response.config.baseURL}${response.config.url}]`;

			if (mocks[key]) {
				data = {
					...data,
					...mocks[key]
				}
			}

			return data;
		}, (error: Error) => {
			return Promise.reject(error);
		});
	}
};

export default Kawarimi;