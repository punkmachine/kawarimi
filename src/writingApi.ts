interface IRequest {
	use: Function,
};

interface IResponse {
	use: Function,
};

interface IInterceptors {
	request: IResponse,
	response: IRequest
}

interface IInstance {
	request: IRequest,
	response: IResponse,
	interceptors: IInterceptors
};

interface IConfigRequest {
	adapter: string[],
	baseURL: string,
	env: object,
	headers: object, // todo: интерфейс хедера?
	maxBodyLength: number,
	maxContentLength: number,
	method: string, // todo: словарь методов?
	timeout: number,
	transformRequest: Function,
	transformResponse: Function,
	transitional: object,
	url: string,
	validateStatus: Function,
	xsrfCookieName: string,
	xsrfHeaderName: string,
};

interface IInterceptorResponse {
	config: IConfigRequest,
	data: any,
	headers: object,
	request: object,
	status: number,
	statusText: string,
};

interface IWritingData {
	request: {
		baseUrl: string,
		url: string,
		method: string,
		headers: object,
	},
	response: {
		data: any,
		headers: object,
		status: number,
	}
};

export function writingApi(instance: IInstance): void {
	instance.interceptors.response.use((response: IInterceptorResponse) => {
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