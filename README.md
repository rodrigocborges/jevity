
![Logo](https://i.imgur.com/3XYnfXe.png)

[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/rodrigocborges/jevity/blob/master/README.pt-br.md)
![](https://img.shields.io/npm/v/jevity)

# jevity
A simple JavaScript library for building basic layouts, simplifying requests, and serving as a `generic utility tool` for repetitive operations.

## What can it do?
- Simplify HTTP requests using `simplifyFetch`;
- Facilitate CRUD operations using the `CRUD` class, which provides local data management with simple events to handle these data operations on your server;

## Installation
Run the following command:
```
npm install jevity
```

---

## `CRUD` Class

The `CRUD` class allows you to create a basic structure for handling in-memory data, improving performance and making it easier to send updates to the server using callbacks.

### Constructor

```typescript
constructor(startData?: Array<GenericCRUDModel>, callback?: CRUDCallback)
```

- `startData`: An optional initial array of `GenericCRUDModel` objects.
- `callback`: An optional object containing callback functions for CRUD events.

### Methods

#### `insert(data: GenericCRUDModel): GenericCRUDModel`

Inserts a new item into the database.

```typescript
const crud = new CRUD();
const newItem = crud.insert({ name: "Item 1" });
console.log(newItem);
```

#### `getById(id: string): GenericCRUDModel | undefined`

Gets an item by ID.

```typescript
const item = crud.getById("some-id");
console.log(item);
```

#### `update(id: string, data: GenericCRUDModel): boolean`

Updates an existing item by ID.

```typescript
const updated = crud.update("some-id", { name: "New Name" });
console.log(updated ? "Updated successfully" : "Update failed");
```

#### `delete(id: string): boolean`

Removes an item by ID.

```typescript
const deleted = crud.delete("some-id");
console.log(deleted ? "Deleted successfully" : "Item not found");
```

#### `getAll(): Array<GenericCRUDModel>`

Returns all stored items.

```typescript
const allItems = crud.getAll();
console.log(allItems);
```

### CRUD Events

The `CRUD` class supports callbacks for events triggered during data operations. Available events:

- `onInserted(data: GenericCRUDModel)`: Triggered after inserting a new item.
- `onUpdated(oldData: GenericCRUDModel, newData: GenericCRUDModel)`: Triggered after updating an item.
- `onDeleted(data: GenericCRUDModel)`: Triggered after deleting an item.
- `onChangedData(data: Array<GenericCRUDModel>)`: Triggered whenever the dataset is modified.

Example usage with events:

```typescript
const crud = new CRUD([], {
  onInserted: (data) => console.log("Inserted:", data),
  onUpdated: (oldData, newData) => console.log("Updated:", oldData, "->", newData),
  onDeleted: (data) => console.log("Deleted:", data),
  onChangedData: (data) => console.log("Changed data:", data)
});
```

---

## `simplifyFetch` Function

The `simplifyFetch` function simplifies HTTP calls using `fetch`.

### Parameters

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

- `url`: The endpoint URL.
- `method`: HTTP method (default: `GET`).
- `headers`: Custom HTTP headers.
- `data`: Data to send with the request (JSON or other formats).
- `callbacks`: Callback functions for success or error handling.
- `responseType`: Response type (`json`, `blob`, or `text`).

### Usage Example

#### GET Request

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

#### POST Request with JSON

```typescript
await simplifyFetch({
  url: "https://api.example.com/new",
  method: "POST",
  data: { json: true, data: { name: "Example" } },
  responseType: "json",
  callbacks: {
    onRequestSuccess: (response) => console.log("Created:", response),
    onRequestError: (error) => console.error("Error:", error),
  }
});
```

#### DELETE Request

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