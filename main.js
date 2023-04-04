import { Jevity } from './src/core.js';

function testTemplate(props){
    console.log(props);
    return `
        <p class="fw-bold">#${props.id} - ${props.title}</p>
        <p>${props.description}</p>
    `;
}

(async () => {

    const jevity = new Jevity();   
    
    jevity.addTemplate('t1', testTemplate);
    
    jevity.start();
})();