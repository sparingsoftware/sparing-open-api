// TODO Simplify types
export default function onCreateRoute(routeData: {
  responseBodySchema: { type: string }
  routeParams: {
    query: {
      name: string
      required: boolean
      in: string
      description: string
      schema: { type: string }
      type: string
    }[]
  }
  request: {
    query?: { type: string; name: string; optional: boolean }
    method: string
  }
}) {
  if (routeData.request.method !== 'get') return routeData

  const type = `FetchKeys<${routeData.responseBodySchema.type}>`

  routeData.routeParams.query.push({
    name: 'fetchKeys',
    required: false,
    in: 'query',
    description: 'Keys to fetch from endpoint',
    schema: { type },
    type
  })

  if (routeData.request.query) {
    const requestQuery = routeData.request.query
    routeData.request.query = {
      ...requestQuery,
      type: requestQuery.type.slice(0, -1) + 'fetchKeys?: T }'
    }
  } else {
    routeData.request.query = {
      name: 'query',
      optional: true,
      type: `{ fetchKeys?: T }`
    }
  }

  return routeData
}
