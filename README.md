# Plooto Todo

Using Vue 3 in Vite.

## Project Setup

```sh
yarn install --frozen-lockfile
```

### Compile and Hot-Reload for Development

Start the backend:

```sh
yarn server
```

Separately, start the frontend:

```sh
yarn dev
```


### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Project Notes

1. Built using Vue 3 and TypeScript on the Frontend.
2. Built using Node.js and TypeScript for the backend server.
2. Uses the Composition API to handle the logic of the components and the store.
3. Uses a local storage / a file-based storage to persist the to-do items on the backend.
4. Features include
   * List of To-do items, where users can see all the to-do items.
   * Add To-do items, where users can add new to-do items.
   * Update to-do items, where users can edit existing to-do items.
   * Delete to-do items, where users can delete existing to-do items.
   * Mark item as Completed, where users can mark a to-do item as completed.
5. Uses axios to make HTTP requests to the backend server.
6. Uses Pinia to manage the state of the application.


### Considerations
A more robust storage solution is required in a real production environment than the implemented file-based storage.