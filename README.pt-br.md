
![Logo](https://i.imgur.com/3XYnfXe.png)

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/rodrigocborges/jevity/blob/master/README.md)
![](https://img.shields.io/npm/v/jevity)

# jevity
Uma simples biblioteca Javascript para construir layouts simples, facilitar as requisições e também servir como um `generic utility tool` para operações repetitivas.

## O que é possível fazer?
- Facilitar as requisições HTTP usando o `simplifyFetch`;
- Facilitar a criação de CRUDs usando a classe `CRUD` que traz um gerenciamento de dados locais e com eventos simples para manipular esses dados no seu servidor;

## Instalação
Execute o seguinte comando:
```
npm install jevity
```

---

## Classe `CRUD`

A classe `CRUD` permite criar uma estrutura básica para manipular dados em memória para melhor performance e envio facilitado para o servidor usando os callbacks.

### Construtor

```typescript
constructor(startData?: Array<GenericCRUDModel>, callback?: CRUDCallback)
```

- `startData`: Um array inicial opcional de objetos do tipo `GenericCRUDModel`.
- `callback`: Um objeto opcional contendo funções de callback para eventos CRUD.

### Métodos

#### `insert(data: GenericCRUDModel): GenericCRUDModel`

Insere um novo item na base de dados.

```typescript
const crud = new CRUD();
const newItem = crud.insert({ name: "Item 1" });
console.log(newItem);
```

#### `getById(id: string): GenericCRUDModel | undefined`

Obtém um item pelo ID.

```typescript
const item = crud.getById("some-id");
console.log(item);
```

#### `update(id: string, data: GenericCRUDModel): boolean`

Atualiza um item existente pelo ID.

```typescript
const updated = crud.update("some-id", { name: "Novo Nome" });
console.log(updated ? "Updated successfully" : "Updated failed");
```

#### `delete(id: string): boolean`

Remove um item pelo ID.

```typescript
const deleted = crud.delete("some-id");
console.log(deleted ? "Deleted successfully" : "Item not found");
```

#### `getAll(): Array<GenericCRUDModel>`

Retorna todos os itens armazenados.

```typescript
const allItems = crud.getAll();
console.log(allItems);
```

### Eventos do CRUD

A classe `CRUD` suporta callbacks para eventos durante a manipulação dos dados. Os eventos disponíveis são:

- `onInserted(data: GenericCRUDModel)`: Chamado após a inserção de um novo item.
- `onUpdated(oldData: GenericCRUDModel, newData: GenericCRUDModel)`: Chamado após a atualização de um item.
- `onDeleted(data: GenericCRUDModel)`: Chamado após a remoção de um item.
- `onChangedData(data: Array<GenericCRUDModel>)`: Chamado sempre que a base de dados for alterada.

Exemplo de uso com eventos:

```typescript
const crud = new CRUD([], {
  onInserted: (data) => console.log("Inserted:", data),
  onUpdated: (oldData, newData) => console.log("Updated:", oldData, "->", newData),
  onDeleted: (data) => console.log("Deleted:", data),
  onChangedData: (data) => console.log("Changed data:", data)
});
```

---

## Função `simplifyFetch`

A função `simplifyFetch` simplifica chamadas HTTP usando `fetch`.

### Parâmetros

```typescript
async function simplifyFetch({
  url,
  method = 'GET',
  headers = {},
  data,
  callbacks,
  responseType
}: SimplifyFetchProps)
```

- `url`: URL do endpoint.
- `method`: Método HTTP (padrão: `GET`).
- `headers`: Cabeçalhos HTTP personalizados.
- `data`: Dados para enviar na requisição (JSON ou outro formato).
- `callbacks`: Funções de callback para sucesso ou erro.
- `responseType`: Tipo de resposta (`json`, `blob` ou `text`).

### Exemplo de Uso

#### Requisição GET

```typescript
await simplifyFetch({
  url: "https://api.example.com/data",
  responseType: "json",
  callbacks: {
    onRequestSuccess: (response) => console.log("Success:", response),
    onRequestError: (error) => console.error("Error:", error),
  }
});
```

#### Requisição POST com JSON

```typescript
await simplifyFetch({
  url: "https://api.example.com/new",
  method: "POST",
  data: { json: true, data: { nome: "Example" } },
  responseType: "json",
  callbacks: {
    onRequestSuccess: (response) => console.log("Created:", response),
    onRequestError: (error) => console.error("Error:", error),
  }
});
```

#### Requisição DELETE

```typescript
await simplifyFetch({
  url: "https://api.example.com/delete/123",
  method: "DELETE",
  responseType: "text",
  callbacks: {
    onRequestSuccess: (response) => console.log("Deleted item:", response),
    onRequestError: (error) => console.error("Error:", error),
  }
});
```