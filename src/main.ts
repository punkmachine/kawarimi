import { InternalAxiosRequestConfig } from '.';

interface IMocks {
	[key: string]: Function;
};

interface IModels {
	[key: string]: Function;
};

const enumsList = {
	'status-orders': [
		1, 2, 3, 4, 5, 6
	]
};

const modelsExample: IModels = {
	'[get]:[http://localhost:3001/orders]': () => {
		return {
			type: 'array', // тип ответа: объект, массив, строка, число.
			properties: {
				id: {
					type: 'int',
					required: true,
					datatype: 'id',
				},
				courierName: {
					type: 'string',
					nullable: true,
					datatype: 'name'
				},
				address: {
					type: 'link',
					required: true,
					datatype: 'address',
					link: 'points' // ссылка на условную модельку поинтов
				},
				status: {
					type: 'enum',
					required: true,
					datatype: 'enum',
					linkEnum: 'status-orders' // ссылка на схему енама где-то в схемах
				}
			},
			link: { // подразумевается, что в типах будет указан ссылочный тип из сваггера
				name: 'orders'
			}
		}
	}
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

function getModel(config) {
	const key: string = `[${config.method}]:[${config.baseURL}${config.url}]`;

	return modelsExample[key];
}

function generateData(config) {
	/*
		count - количество элементов в массиве.
		properties - объект, внутри которого будут данные свойств, которые должны быть заданы статично, а не генератором
	*/
}

export function mockingData(config: InternalAxiosRequestConfig) {
	return new Promise(resolve => {
		const key: string = `[${config.method}]:[${config.baseURL}${config.url}]`;
		let data;

		if (mocks[key]) {
			data = mocks[key]();
		}

		resolve(data);
    });
}