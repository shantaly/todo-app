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
3. Uses the Composition API to handle the logic of the components and the store.
4. Uses a local storage / a file-based storage to persist the To-do items on the backend.
5. Features include
   * List of To-do items, where users can see all the To-do items.
   * Add To-do items, where users can add new To-do items.
   * Update To-do items, where users can edit existing To-do items.
   * Delete To-do items, where users can delete existing To-do items.
   * Mark item as Completed, where users can mark a To-do item as completed.
6. Uses axios to make HTTP requests to the backend server.
7. Uses Pinia to manage the state of the application.


### Considerations
A more robust storage solution is required in a real production environment than the implemented file-based storage.