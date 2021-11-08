## Usage

Set environmental variables
`OPEN_API_URL` (required) - http address of JSON OpenAPI schema to your API
`OPEN_API_OUT_DIR` (default: `./service`) - output directory for generated http service
`OPEN_API_OUT_FILENAME` (default: `__generated-api.ts`) - output filename (filename must be with .ts extension)

In order to help webpack automatically map aliases for generated file in Vue/React projects please use the following config:

```
OPEN_API_OUT_DIR=./src/service
```

## Contributing

Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## License

MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
