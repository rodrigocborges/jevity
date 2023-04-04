import { Request } from './request.js';

export class Jevity {

    constructor(){
        this.templates = [];
    }

    addTemplate(id, template){
        this.templates.push({ id, template });
    }

    getTemplate(id){
        return this.templates.find(x => x.id === id);
    }    

    start() {
        document.querySelectorAll('[jevity]').forEach(el => {

            const eventType = el.getAttribute('j-event-type') ?? 'click';
           
            el.addEventListener(eventType, async (event) => {
    
                const url = event.target.getAttribute('j-url');
                const method = event.target.getAttribute('j-method');
                const target = event.target.getAttribute('j-target');
                const templateID = event.target.getAttribute('j-template');

                document.querySelector(target).innerHTML = 'Carregando...';
    
                const req = new Request(url);
                const response = await req.setMethod(method).go();
                document.querySelector(target).innerHTML = this.getTemplate(templateID).template(response);
    
            });
    
        });

    }

}