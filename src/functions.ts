import { SimplifyFetchProps } from "./types";

export async function simplifyFetch({ url, method = 'GET', headers = {}, data, callbacks, responseType } : SimplifyFetchProps){
	const options : RequestInit = {
		method,
		headers
	};
	if (data) {
        if (data.json) {
            options.body = JSON.stringify(data.data);
            options.headers = { ...headers, 'Content-Type': 'application/json' };
        } else {
            options.body = data.data;
        }
    }

    if (method === 'GET') {
        delete options.body; // Remove body para evitar erro em requisições GET
    }
	const request = await fetch(url, options);
	if(callbacks && !request.ok && callbacks.onRequestError){
		callbacks.onRequestError(request);
	}
	if(!request.ok){
		return;
	}
	const response = responseType == 'json' ? await request.json() : responseType == 'blob' ? await request.blob() : await request.text();
	if(callbacks && callbacks.onRequestSuccess){
		callbacks.onRequestSuccess(response);
	}
}

