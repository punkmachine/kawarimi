import { AxiosInstance, AxiosResponse } from './axios-types'

interface IWritingData {
	request: {
		baseUrl: string | undefined,
		url: string,
		method: string | undefined,
		headers: object,
	},
	response: {
		data: any,
		headers: object,
		status: number,
	}
};

export function writingApi(instance: AxiosInstance): void {
	instance.interceptors.response.use((response: AxiosResponse) => {
		const writeData: IWritingData = {
			request: {
				baseUrl: response.config.baseURL,
				url: `${response.config.baseURL}${response.config.url}`,
				method: response.config.method,
				headers: response.config.headers,
			},
			response: {
				data: response.data,
				headers: response.headers,
				status: response.status,
			}
		};

		console.log(writeData);

		return response;
	}, function (error) {
		return Promise.reject(error);
	});
}