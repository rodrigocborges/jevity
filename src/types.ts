export interface SimplifyFetchCallback {
	onRequestSuccess?: (response?: object) => void;
	onRequestError?: (response?: object) => void;
}; 

export type SimplifyFetchDataTypeProps = {
	json?: boolean;
	data: BodyInit;
}; 

export type SimplifyFetchProps = {
	url: string;
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	data?: SimplifyFetchDataTypeProps;
	headers?: { [key: string]: string };
	callbacks: SimplifyFetchCallback,
	responseType: 'json' | 'text' | 'blob';
};

export type GenericCRUDModel = {
	internalId?: string;
	data: object
};

export interface CRUDCallback {
	onInserted?: (data?: GenericCRUDModel) => void;
	onUpdated?: (oldData?: GenericCRUDModel, newData?: GenericCRUDModel) => void;
	onDeleted?: (data?: GenericCRUDModel) => void;
	onChangedData?: (data?: GenericCRUDModel[]) => void;
}
