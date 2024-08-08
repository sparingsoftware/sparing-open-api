type Flatten<T> = T extends any[] ? T[number] : T
type ChangeTypeOfKeys<T extends object, Keys extends keyof T, NewType> = {
  [key in keyof T]: key extends Keys ? NewType : T[key]
}
type MapObjectKeysToTrue<ObjectType extends Record<PropertyKey, any>> = {
  [key in keyof ObjectType]?: ObjectType[key] extends Record<PropertyKey, any>
    ? true | MapObjectKeysToTrue<Flatten<ObjectType[key]>>
    : true
}
type FetchKeysType = { [key in PropertyKey]: true | FetchKeysType }
type FetchKeys<ResponseModel> = ResponseModel extends {
  count?: number
  results?: Array<infer DataModel>
}
  ? DataModel extends Record<PropertyKey, any>
    ? MapObjectKeysToTrue<DataModel>
    : DataModel
  : ResponseModel extends Record<PropertyKey, any>
  ? MapObjectKeysToTrue<Flatten<ResponseModel>>
  : ResponseModel

type NestedSafePick<ResponseModel, FetchKeysType> = ResponseModel extends Array<
  infer Model
>
  ? NestedSafePick<Model, FetchKeysType>[]
  : {
      [key in keyof FetchKeysType]: FetchKeysType[key] extends Record<
        PropertyKey,
        any
      >
        ? key extends keyof ResponseModel
          ? ResponseModel[key] extends Array<infer DataModel>
            ? NestedSafePick<DataModel, FetchKeysType[key]>[]
            : NestedSafePick<ResponseModel[key], FetchKeysType[key]>
          : never
        : key extends keyof ResponseModel
        ? ResponseModel[key] extends Array<infer DataModel>
          ? DataModel[]
          : ResponseModel[key]
        : never
    }

export type PickKeys<ResponseModel, FetchKeysType> = {} extends FetchKeysType
  ? ResponseModel
  : ResponseModel extends {
      count?: number
      results?: Array<infer DataModel>
    }
  ? ChangeTypeOfKeys<
      ResponseModel,
      'results',
      NestedSafePick<DataModel, FetchKeysType>[]
    >
  : ResponseModel extends Array<infer DataModel>
  ? NestedSafePick<DataModel, FetchKeysType>[]
  : NestedSafePick<ResponseModel, FetchKeysType>

export function postprocessQuery(query?: any) {
  if (!query) return query

  const parsedQuery = query
  if (query.fetchKeys) {
    function getStringifiedQueryKeys(keys: FetchKeysType) {
      let query = '{'
      Object.entries(keys).forEach(([key, value], index) => {
        if (typeof value === 'object') {
          const keyToAdd = `${key}${getStringifiedQueryKeys(value)}`
          query += index > 0 ? `,${keyToAdd}` : keyToAdd
        } else {
          query += index > 0 ? `,${key}` : key
        }
      })
      return query + '}'
    }

    parsedQuery.query = getStringifiedQueryKeys(query.fetchKeys)
  }

  delete parsedQuery.fetchKeys
  return parsedQuery
}
