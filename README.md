## Installation

```
npm i @sparing-software/sparing-open-api
```

## Usage

Set environmental variables
- `OPEN_API_URL` (required) - http address of JSON OpenAPI schema to your API
- `OPEN_API_OUT_DIR` (default: `./service`) - output directory for generated http service
- `OPEN_API_OUT_FILENAME` (default: `__generated-api.ts`) - output filename (filename must be with .ts extension)

In order to help webpack automatically map aliases for generated file in Vue/React projects please use the following config:

```
OPEN_API_OUT_DIR=./src/service
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

## Contributing

Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## License

MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
