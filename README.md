
![Logo](https://i.imgur.com/6UTKtHp.png)


# jevity
Um framework Javascript simples para construir layouts simples, facilitar as requisições e também servir como um utility tool para operações repetitivas.

## Documentação

*O intuito dessa documentação é ser algo simples e rápido de ser consultado! E o mais legal: com exemplo prático 😉*

Para criar um componente basta adicionar o atributo `jevity` ao elemento HTML. Exemplo de um botão:

```html
<button jevity>Clique aqui</button>
```

Após isso, para dar dinamismo a esse botão basta adicionar mais alguns atributos. Para um melhor exemplo, vamos ao clicar no botão, fazer uma requisição GET e injetar o conteúdo do retorno em uma div:

```html
<div class="card">
    <div class="card-body" id="content">
        Nenhum conteúdo.
    </div>
    <div class="card-footer">
        <button 
            class="btn btn-primary" 
            jevity
            j-event-type="click"
            j-url="https://dummyjson.com/products/2"
            j-method="GET"
            j-target="#content"
            j-template="t1">
            Carregar
        </button>
    </div>
</div>
```

Sobre cada atributo:
- `j-event-type` se refere a qualquer tipo válido de evento (click, mouseover, blur, focus, etc);
- `j-url` se refere a URL em si que você pretende fazer a requisição;
- `j-method` é onde é definido o verbo HTTP (POST, GET, PUT, PATCH, etc);
- `j-target` é definido o selector para onde o retorno vai ser injetado, exatamente como funciona a função nativa 'querySelector' do Javascript;
- `j-template` é o ID atribuído na função `addTemplate` que nesse exemplo foi 't1' como pode ser mostrado abaixo:

```js
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
```

A função `addTemplate` é pertencente ao framework e o primeiro parâmetro se refere ao ID, que pode ser tanto um número quanto um texto que faça você se lembrar rapidamente. Ao fazer a requisição e definir esse template, será enviado como parâmetro o objeto de resposta, como podemos ver no parâmetro `props` que recebe todo o retorno da API definida nesse exemplo.
