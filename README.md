# Athletic Timing

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/jwrunner/AthleticTiming)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/jwrunner/AthleticTiming)

## Tech Stack
- Firebase
- [SvelteJS](https://svelte.dev) & [SvelteKit](https://kit.svelte.dev)

## Developing

- `npm install`
- `npm run dev`
- Make changes to pages in `src/routes` 
  - `index.svelte` = `/` (homepage)
  - `photos.svelte` = `/photos`
  - `schedule/[year].svelte` = `/schedule/2021` w/ `2021` being a variable that sets the year.
- store assets (images) in `static`, `static/images/dan.jpg` will be available in the app as `/images/dan.jpg`
- Commit changes and push to deploy

## Publishing
Pushes to the `main` branch deploy your changes live in a couple minutes, pushes to any other branch will give you a deploy preview URL in Github (logging in may not work)


## TODO
- fix date issue with GMT