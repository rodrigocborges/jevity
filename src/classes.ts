import { CRUDCallback, GenericCRUDModel } from "./types";

export class CRUD {
	protected data: Array<GenericCRUDModel>;

	constructor(protected startData?: Array<GenericCRUDModel>, protected callback?: CRUDCallback){
		this.data = startData ?? new Array<GenericCRUDModel>();
	}

	insert(data: GenericCRUDModel) : GenericCRUDModel {
		if(!data.internalId){
			data.internalId = crypto.randomUUID();
		}
		this.data.push(data);
		if(this.callback && this.callback.onInserted){
			this.callback.onInserted(data);
		}
		if(this.callback && this.callback.onChangedData){
			this.callback.onChangedData(this.data);
		}
		return data;
	}

	getById(id: string): GenericCRUDModel | undefined {
        return this.data.find((item) => item.internalId === id);
    }

	update(id: string, data: GenericCRUDModel): boolean {
		const index = this.data.findIndex((item) => item.internalId === id);
        if (index === -1) {
            return false;
        }
		const oldData = this.data[index];
        this.data[index] = data;
		if(this.callback && this.callback.onUpdated){
			this.callback.onUpdated(oldData, data);
		}
		if(this.callback && this.callback.onChangedData){
			this.callback.onChangedData(this.data);
		}
        return true;
    }

	delete(id: string): boolean {
		const index = this.data.findIndex((item) => item.internalId === id);
        if (index === -1) {
            return false;
        }
		const oldData = this.data[index];
        this.data.splice(index, 1);
		if(this.callback && this.callback.onDeleted){
			this.callback.onDeleted(oldData);
		}
		if(this.callback && this.callback.onChangedData){
			this.callback.onChangedData(this.data);
		}
        return true;
	}

	getAll(): Array<GenericCRUDModel> {
        return this.data;
    }
}