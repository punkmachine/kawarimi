import { typeViewingEnums } from './enums';

interface IModels {
	[key: string]: Function;
};

const models: IModels = {
	'[get]:[http://localhost:3001/watch-list]': () => {
		return {
			type: 'array[object]',
			properties: {
				id: {
					type: 'id',
					required: true,
				},
				name: {
					type: 'string',
					required: true,
					options: {
						maxLength: 30,
						minLength: 4,
						specialSymbols: true,
						textTransform: 'capitalize',
					},
				},
				'is-franchise': {
					type: 'boolean',
					required: true,
				},
				'type-viewing': {
					type: 'enum',
					required: true,
					linkEnum: typeViewingEnums.link,
				},
			},
			link: {
				name: 'watch-list'
			}
		}
	},
	'[get]:[http://localhost:3001/type-viewing]': () => {
		return {
			type: 'array[string]',
			options: {
				enum: true,
				linkEnum: typeViewingEnums.link,
			},
			link: {
				name: 'type-viewing'
			}
		}
	},
};

export {
	models
};