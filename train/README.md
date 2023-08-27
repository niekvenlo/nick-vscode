## You are reading the README

First off,

- I used Next to bootstrap this project, but didn't really use any of its cool features.
- I used React-Query in this project. I'm a fan. Otherwise, I didn't really use any dependencies.
- I used TypeScript.

"The first page should have a search bar, filters for narrowing down the search, and a container to display the search results."
Done

"The results should be sortable based on the following stats: stars and forks."
Easy.

"The search bar should check if the input text is contained in any of the following: name, description, topics, or readme"
Done.

"Additional search parameters should include the number of followers, number of stars, and language."
I wasn't sure what to do here. I didn't want to hard-code a long list of coding languages. I ended up building a dropdown filter that filters the results locally based on language, where you can only select languages that appear in the search results.
I didn't implement a way to search for the number of followers, but the results table shows the number of followers for anyone who is interested in those numbers.

"The second page should list the history of searched items. Clicking on any of them should trigger the display of the same first 10 results."
I ended up implementing this as a modal rather than a separate page. I didn't really have enough to render to fill a whole page.

- Nick

# About Next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
