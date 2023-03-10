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
	baseUrl: string,
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
	// data: // todo: а какой тип указать то для данных с сервера...
	headers: object,
	request: object,
	status: number,
	statusText: string,
}

export function writingApi(instance: IInstance): void {
	instance.interceptors.request.use((config: IConfigRequest) => {
		console.log(config);

		return config;
	}, function (error) {
	  return Promise.reject(error);
	});

	instance.interceptors.response.use((response: IInterceptorResponse) => {
		console.log(response);

		return response;
	}, function (error) {
		return Promise.reject(error);
	});
}