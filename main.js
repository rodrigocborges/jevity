import { Request } from './src/request.js';

(async () => {

    //Apenas testes

    const req = new Request('https://dummyjson.com/products/2');

    console.log(await req.get().go());

    document.querySelectorAll('[jevity]').forEach(el => {

        el.addEventListener('click', async (event) => {

            
            const url = event.target.getAttribute('j-url');
            const method = event.target.getAttribute('j-method');
            const target = event.target.getAttribute('j-target');
            document.querySelector(target).innerHTML = 'Carregando...';

            const req = new Request(url);
            const response = await req.setMethod(method).go();

            document.querySelector(target).innerHTML = `
                <p class="fw-bold">${response.title}</p>
                <p>${response.description}</p>
            `;

        });

    });

})();