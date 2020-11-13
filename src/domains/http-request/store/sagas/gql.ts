import { TResponse } from "@/typings/httpClient";
import { HttpClient } from "@/utils/HttpClient";
import { SagaIterator, Task } from "redux-saga";
import {
  put,
  select,
  take,
  fork,
  race,
  TakeEffect,
  cancel,
  cancelled,
  call,
} from "redux-saga/effects";
import { HttpRequestSelectors as Selectors } from "../selectors";
import {
  cancelLoadGqlSchema,
  loadGqlSchema,
  loadGqlSchemaStart,
  loadGqlSchemaEnd,
} from "../slice";
import { message } from "antd";

function* gqlSchemaSaga(): SagaIterator {
  const client = new HttpClient();
  try {
    yield put(loadGqlSchemaStart());
    const url: string = yield select(Selectors.getUrl);
    const res: TResponse = yield call(client.make, url, "POST", {
      headers: {
        "content-type": "application/json",
      },
      body: {
        operationName: "IntrospectionQuery",
        variables: {},
        query:
          "query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
      },
    });
    if (res.error) {
      message.error(res.data);
    } else {
      message.success("Schema has been loaded");
    }
    yield put(loadGqlSchemaEnd(res.data));
  } catch (_e) {
    yield put(loadGqlSchemaEnd(null));
  } finally {
    if (yield cancelled()) {
      yield put(loadGqlSchemaEnd(null));
      client.cancel();
    }
  }
}

export default function* watchGqlSchema() {
  while (yield take(loadGqlSchema.type)) {
    const task: Task = yield fork(gqlSchemaSaga);
    const [cancelCase]: TakeEffect[] = yield race([
      take(cancelLoadGqlSchema.type),
      take(loadGqlSchemaEnd.type),
    ]);
    if (cancelCase) {
      yield cancel(task);
    }
  }
}
