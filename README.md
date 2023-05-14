# insta
Introducing Insta, a clone of Instagram built with Vue 3 script setup. With Insta, you can sign in and login, upload posts, follow and unfollow other users, see your following posts in the timeline (homepage), search for specific usernames, and access your own profile.

Insta uses pinia for state management, supabase for the backend, ant design vue for its prebuilt components, and vue-router to route between URLs. Get started with Insta today and experience all the features of Instagram in your own web app!
You can watch the video below for a temporary introduction to the project.

https://github.com/Parsa361/Insta/assets/77281736/0bc621c5-827a-43c8-98cf-4876a89003e0

## Features
<li>Sign in and login ( they all have validation on its forms )</li>
<li>Access own profile</li>
<li>Upload posts</li>
<li>Follow and unfollow other users</li>
<li>Timeline to see following posts</li>
<li>Search for specific usernames</li>


## Tools Used
<li>Pinia - State management library for Vue 3</li>
<li>Supabase - Cloud backend service for building APIs with PostgreSQL</li>
<li>Ant Design Vue - A set of prebuilt components for Vue.js</li>
<li>Vue Router - The official router for Vue.js</li>
<br>

you started developing with Vue 3 in Vite.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
