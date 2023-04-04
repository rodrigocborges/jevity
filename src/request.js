export class Request {

    constructor(url){
        this.url = url;
        this.method = 'GET';
        this.contentType = 'application/json';
        this.body = {};
    }

    get(){
        this.method = 'GET';
        return this;
    }

    post(){
        this.method = 'POST';
        return this;
    }

    delete(){
        this.method = 'DELETE';
        return this;
    }

    patch(){
        this.method = 'PATCH';
        return this;
    }

    put(){
        this.method = 'PUT';
        return this;
    }

    setMethod(method){
        this.method = method;
        return this;
    }

    setBody(body){
        this.body = body;
        return this;
    }

    setContentType(type){
        this.contentType = type;
        return this;
    }

    async go(jsonReturn = true){
        let options = {
            method: this.method,
            headers: {
                'Content-Type': this.contentType
            }
        };

        if(Object.entries(this.body).length > 0){
            options.body = JSON.stringify(this.body);
        }

        const request = await fetch(this.url, options);
        return jsonReturn ? request.json() : request.text();
    }

}