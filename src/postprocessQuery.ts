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
type FetchKeysObject<ResponseModel> = ResponseModel extends {
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

type PickKeysFromObject<ResponseModel, FetchKeysType> = {} extends FetchKeysType
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

function getStringifiedQueryKeys(keys: FetchKeysObject<unknown>) {
  let query = '{'
  Object.entries(keys as FetchKeysType).forEach(([key, value], index) => {
    if (typeof value === 'object') {
      const keyToAdd = `${key}${getStringifiedQueryKeys(value)}`
      query += index > 0 ? `,${keyToAdd}` : keyToAdd
    } else {
      query += index > 0 ? `,${key}` : key
    }
  })
  return query + '}'
}

type IsArray<T> = T extends Array<any> ? true : false

type DotNotationKeys<T, P extends string = ''> = T extends object
  ? IsArray<T> extends true
    ? P extends ''
      ? never
      : P
    : {
        [K in keyof T]: K extends string
          ? P extends ''
            ? K | DotNotationKeys<T[K], K>
            : `${P}.${K}` | DotNotationKeys<T[K], `${P}.${K}`>
          : never
      }[keyof T]
  : P

type FetchKeysArray<T> = DotNotationKeys<T>[]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S]

type PickByPath<T, Path extends any[]> = Path extends [infer P, ...infer Rest]
  ? P extends keyof T
    ? { [K in P]: PickByPath<T[P], Rest> }
    : unknown
  : T

type PickKeysFromArray<T, Keys extends string[]> = Merge<
  UnionToIntersection<
    {
      [K in keyof Keys]: PickByPath<T, Split<Extract<Keys[K], string>, '.'>>
    }[number]
  >
>

type Merge<T> = {
  [K in keyof T]: T[K]
}

function getFetchKeysFromArray(paths: string[]) {
  const fetchKeys: FetchKeysType = {}
  for (const path of paths) {
    let currentObject = fetchKeys
    const nestedFields = path.split('.')
    for (const nestedField of nestedFields.slice(0, -1)) {
      if (!currentObject[nestedField]) currentObject[nestedField] = {}
      currentObject = currentObject[nestedField] as FetchKeysType
    }
    currentObject[nestedFields.at(-1) as string] = true
  }
  return getStringifiedQueryKeys(fetchKeys)
}

export type FetchKeys<ResponseModel = unknown> =
  | FetchKeysObject<ResponseModel>
  | FetchKeysArray<ResponseModel>
export type PickKeys<
  ResponseModel,
  KeysToFetch extends FetchKeys<ResponseModel>
> = KeysToFetch extends string[]
  ? PickKeysFromArray<ResponseModel, KeysToFetch>
  : PickKeysFromObject<ResponseModel, KeysToFetch>

function getQuery(fetchKeys: FetchKeys) {
  return Array.isArray(fetchKeys)
    ? getFetchKeysFromArray(fetchKeys)
    : getStringifiedQueryKeys(fetchKeys)
}

export function postprocessQuery(params?: any) {
  if (!params) return params
  if (params.fetchKeys) params.query = getQuery(params.fetchKeys)
  delete params.fetchKeys
  return params
}
