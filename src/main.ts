import { InternalAxiosRequestConfig, IModelItem } from '.';
import { models } from './schemas/models';

interface IMocks {
	[key: string]: Function;
};

// todo: нормальный интерфейс
interface IOptionsGenerate {
	[key: string]: any,
};

// Данные, которые мы будем генерировать из моделей:
const mocks: IMocks = {
	'[get]:[http://localhost:3001/type-viewing]': () => {
		return {
			data: [
				"movie",
				"cartoon",
				"series",
				"animated_series",
				"anime",
				"anime_series"
			]
		}
	},
	'[get]:[http://localhost:3001/watch-list]': () => {
		return {
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
		}
	},
};

function getKey(config: InternalAxiosRequestConfig): string {
	return `[${config.method}]:[${config.baseURL}${config.url}]`;
}

function getModel(config: InternalAxiosRequestConfig): IModelItem {
	const key: string = getKey(config);
	const model: IModelItem = models[key]();

	return model;
}

// todo: генерация данных
function generateData(model: IModelItem, options?: IOptionsGenerate): any {
	console.log('model >>>', model);
	console.log('options >>>', options);

	if (options) {
		return  mocks[options.key]();
	}

	return null;
}

export function mockingData(config: InternalAxiosRequestConfig) {
	return new Promise(resolve => {
		const model: IModelItem = getModel(config);
		// notes: key временная хрень
		const data = generateData(model, { key: getKey(config) });

		console.log('data >>>', data);

		resolve(data);
    });
}