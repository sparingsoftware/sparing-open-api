## Installation

```
npm i @sparing-software/sparing-open-api
```

## Usage

Create a sparing-open-api.config.js file at the root of the project

```js
/** @type {import('@sparing-software/sparing-open-api').Config} */
export default {
  url: 'https://example.com/schema/'
}
```

---

To comfortly use generated service in futher application consider creating another file in `service` folder:

`service/http.service.ts`

```ts
import { Api } from './$OPEN_API_OUT_FILENAME'

export const httpService = new Api({
  baseURL: process.env.VUE_APP_API_URL
})

httpService.instance.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
```

Which can be later easily used as follows:

```ts
import { httpService } from '@/service/http.service'
const issues = await httpService.projects.getIssues(project.id)
```

---

It is also recommended to add `prebuild` and `preserve`/`predev` scripts to your `package.json` file in order to get the newest api on each start:

```json
{
  "scripts": {
    "prebuild": "sparing-open-api",
    "preserve": "sparing-open-api",
    ...
  }
}
```

Or you can always do it manually by running `sparing-open-api` from terminal opened inside your project.

## Contributing

Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## Releasing and versioning

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to automatically bump major, minor and patch versions. Read more about semantic releasing in this [docs](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow).

## License

MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
